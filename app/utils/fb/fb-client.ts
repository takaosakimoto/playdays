import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/index';
import { Facebook } from 'ionic-native';

@Injectable()
export class FBClient {
  private permissions = ['public_profile', 'user_friends', 'email', 'user_likes'];

  constructor(
    private _platform: Platform
  ) {
    if (!this._platform.is('cordova')) {
      console.debug('Please run me on a device');
    };
  }

  login() {
    return Facebook.login(this.permissions);
  }

  getLoginStatus() {
    return Facebook.getLoginStatus();
  }

  api(requestPath) {
    return Facebook.api(requestPath, this.permissions);
  }
}
