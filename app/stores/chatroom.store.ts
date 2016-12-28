import { Observable } from 'rxjs/Rx';
import { Chatroom } from '../models';
import { CollectionStore } from '../engine/store';
import * as _ from 'lodash';

export class ChatroomStore extends CollectionStore<Chatroom> {

  constructor(
  ) {
    super(Chatroom);
  }

  get chatrooms$(): Observable<Array<Chatroom>> {
    return this.state$;
  }

  chatroom$(id: number): Observable<Chatroom> {
    return this.state$.map((chatrooms: Array<Chatroom>): Chatroom => {
      return _.find(chatrooms, (c) => c.id === id);
    });
  }

  chatroomByParticipationId$(id: number): Observable<Chatroom> {
    return this.state$.map((chatrooms: Array<Chatroom>): Chatroom => {
      return _.find(chatrooms, (c) => _.findIndex(c.chatParticipations, (cp) => cp.id === id) >= 0);
    });
  }

  get totalUnreadCount$(): Observable<number> {
    let chatroomsSource = this.state$;
    return chatroomsSource.map((chatrooms: Array<Chatroom>): number => {
      return chatrooms.reduce((p: number, c: Chatroom) => {
        return p + c.unreadCount;
      }, 0);
    });
  }
}
