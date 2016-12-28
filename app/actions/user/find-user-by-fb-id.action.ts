import { Injectable } from '@angular/core';
import { User } from '../../models';
import { SearchUsersResultStore } from '../../stores';
import { UserEndpoint } from '../../endpoints';
import { Action } from '../../engine/action';
import { first } from 'lodash';

@Injectable()
export class FindUsersByFbIdAction extends Action<string, User> {

  constructor(
    private _userEndpoint: UserEndpoint
  ) {
    super();
  }

  onExecute(params: string) {
    this._userEndpoint.fetchMultipleWithParams({fb_user_id: params})
      .subscribe(
        (users: Array<User>): void => {
          this.success$.next(first(users));
        },
        e => this.error$.next(e)
      );
  }
}
