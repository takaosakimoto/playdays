import { Injectable } from '@angular/core';
import { Chatroom } from '../../models';
import { ChatroomEndpoint } from '../../endpoints';
import { ChatroomStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetChatroomsAction extends ActionNoPayload<Array<Chatroom>> {

  constructor(
    private _chatroomEndpoint: ChatroomEndpoint,
    private _chatroomStore: ChatroomStore
  ) {
    super();
  }

  onExecute() {
    this._chatroomEndpoint.fetchMultiple()
      .subscribe(
        (chatrooms: Array<Chatroom>) => {
          this._chatroomStore.saveMany(chatrooms);
          this.success$.next(chatrooms);
        },
        e => this.error$.next(e)
      );
  }
}
