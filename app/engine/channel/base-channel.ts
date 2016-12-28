import {
  Channel as PhoenixChannel
} from 'phoenix-channels-client';

import { Observable, Subject, BehaviorSubject }  from 'rxjs/Rx';
import { SocketClient } from '../../utils';

// TODO handle re-join
export class BaseChannel {

  protected _topicChannels: Map<string, PhoenixChannel> = new Map<string, PhoenixChannel>();

  protected _responseDataRoot: string = 'data';

  constructor(
    protected _socket: SocketClient
  ) {
  }

  // TODO lazy calling join()
  join(topic: string, params?: any): Observable<boolean> {
    let o = new BehaviorSubject<boolean>(false);
    let topicChannel: PhoenixChannel;

    console.log('all topicChannels', this._topicChannels);
    if (this._topicChannels.has(topic)) {
      topicChannel = this._topicChannels.get(topic);
    } else {
      topicChannel = this._createTopicChannel(topic, params || {});
      topicChannel.onError((reason) => console.warn('channel error', reason));
      topicChannel.onClose(() => console.debug('channel closed'));
      console.debug('this._topicChannel', topicChannel);
    }

    let state = topicChannel.state;

    console.log(state);
    if (state === 'closed' || state === 'errored') {
      topicChannel.join()
        .receive('ok', () => o.next(true))
        .receive('error', (reason) => o.error(reason))
        .receive('timeout', (reason) => o.error(reason || 'timeout'));
    } else {
      topicChannel.joinPush
        .receive('ok', () => o.next(true))
        .receive('error', (reason) => o.error(reason))
        .receive('timeout', (reason) => o.error(reason || 'timeout'));
    }

    return o;
  }

  // TODO lazy calling leave()
  leave(topic: string): Observable<boolean> {
    this._ensureTopicChannelExist(topic);
    let o = new Subject<boolean>();
    let topicChannel = this._topicChannels.get(topic);

    topicChannel.leave()
      .receive('ok', () => o.next(true))
      .receive('error', (reason) => o.error(reason))
      .receive('timeout', (reason) => o.error(reason || 'timeout'));

    return o;
  }

  subscribe(topic: string, eventName: string): Observable<any> {
    this._ensureTopicChannelExist(topic);
    let o = new Subject<any>();
    let topicChannel = this._topicChannels.get(topic);

    topicChannel.on(eventName, (payload) => {
      let data = this._parseResponseData(payload);
      o.next(data);
    });

    return o;
  }

  private _ensureTopicChannelExist(topic: string): void {
    if (!this._topicChannels.has(topic)) {
      throw `attempt to subscribe or leave a topic channel ${topic} which do not exist`;
    }
  }

  private _createTopicChannel(topic: string, params: any): PhoenixChannel {
    if (this._topicChannels.has(topic)) {
      throw `attempt to create a topic channel ${topic} which do exist`;
    }
    let c = this._socket.channel(topic, params);
    this._topicChannels.set(topic, c);
    console.debug(`create a topich channel ${topic}`, c);
    return c;
  }

  private _parseResponseData(payload: any): any {
    if (this._responseDataRoot && this._responseDataRoot !== '') {
      if (!(this._responseDataRoot in payload)) {
        throw `'${this._responseDataRoot}' not appear as root of response json data`;
      }
      payload = payload[this._responseDataRoot];
    }
    return payload;
  }
}
