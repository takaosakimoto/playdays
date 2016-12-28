import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular/index';
import { ChatroomNewGroupChatPage2 } from './new-group-chat2';

@Component({
  templateUrl: 'build/pages/chatroom/new-group-chat1.html',
})

export class ChatroomNewGroupChatPage1 {
  public name: string = '';

  constructor(
    private _nav: NavController
  ) {
  }

  ngOnInit() {
    console.debug('ChatroomNewGroupChatPage1 ngOnInit');
  }

  ngAfterViewInit() {
    //
  }

  ionViewDidLeave() {
    console.debug('ChatroomNewGroupChatPage1 ionViewDidLeave');
  }

  ionViewDidUnload() {
    console.debug('ChatroomNewGroupChatPage1 ionViewDidUnload');
  }

  ngOnDestroy() {
    console.debug('ChatroomNewGroupChatPage1 ngOnDestroy');
  }

  public goToChatroomNewGroupChatPage2() {
    console.log(this.name);
    this._nav.push(ChatroomNewGroupChatPage2, {name: this.name});
  }
}
