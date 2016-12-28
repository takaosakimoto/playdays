import { Injectable } from '@angular/core';
import { ActionNoPayload } from '../../engine/action';
import { VerifiedAccessToken, Me } from '../../models';
import { VerifyAccessTokenEndpoint } from '../../endpoints';
import { FBClient } from '../../utils';
import { IFBAuthenticationStatus, IVerifyAccessTokenRequest } from '../../interfaces';
import { MeStore } from '../../stores';
import * as _ from 'lodash';

class VerifyToken extends VerifiedAccessToken {
  me: Me;
}

@Injectable()
export class VerifyFBAuthenticationAction extends ActionNoPayload<VerifiedAccessToken> {

  constructor(
    private _fbClient: FBClient,
    private _verifyAccessTokenEndpoint: VerifyAccessTokenEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(): void {
    this._fbClient.getLoginStatus()
      .then(
        (fbAuthenticationStatus: IFBAuthenticationStatus) => {
          if (fbAuthenticationStatus.status === 'connected') {
            this._verifyAccessToken(fbAuthenticationStatus);
          } else {
            this._fbLogin();
          }
        },
        (error) => {
          console.debug(error);
          this.error$.next(error);
      });
  }

  private _fbLogin() {
    this._fbClient.login()
     .then(
        (fbAuthenticationStatus: IFBAuthenticationStatus) => {
          if (fbAuthenticationStatus.status === 'connected') {
            this._meStore.update({
              fbAuthenticationStatus: fbAuthenticationStatus
            });
            this._verifyAccessToken(fbAuthenticationStatus);
          }

        },
        (error) => {
          console.debug(error);
          this.error$.next(error);
      });
  }

  private _verifyAccessToken(fbAuthenticationStatus) {
    const authRepsonse = fbAuthenticationStatus.authResponse;
    const params: IVerifyAccessTokenRequest = {
            fb_user_id: authRepsonse.userID,
            fb_access_token: authRepsonse.accessToken
          };

    this._verifyAccessTokenEndpoint.create(params)
      .subscribe(
        (token: VerifyToken) => {
          if (token.isValid) {
            const me = _.assign(new Me(token.me), {fbAuthenticationStatus});
            this._meStore.update(me);
          } else {
            this._meStore.destroy();
          }
          this.success$.next(token);
        },
        e => {
          this._meStore.destroy();
          this.error$.next(e);
        }
      );
  }
}
