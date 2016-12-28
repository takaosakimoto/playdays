import { Injectable } from '@angular/core';
import { User } from '../../models';
import { ISearchUserByNameRequest } from '../../interfaces';
import { SearchUsersResultStore } from '../../stores';
import { UserEndpoint } from '../../endpoints';
import { Action } from '../../engine/action';

@Injectable()
export class SearchUsersAction extends Action<ISearchUserByNameRequest, Array<User>> {

  constructor(
    private _userEndpoint: UserEndpoint,
    private _searchUsersResultStore: SearchUsersResultStore
  ) {
    super();
  }

  onExecute(params: ISearchUserByNameRequest) {
    this._userEndpoint.fetchMultipleWithParams(params)
      .subscribe(
        (users: Array<User>): void => {
          this._searchUsersResultStore.saveMany(users);

          this.success$.next(users);
        },
        e => this.error$.next(e)
      );
  }
}
