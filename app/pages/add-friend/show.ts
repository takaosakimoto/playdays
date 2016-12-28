import { NavParams} from 'ionic-angular/index';
import { Component } from '@angular/core';
import { User } from '../../models';

@Component({
  templateUrl: 'build/pages/add-friend/show.html',
})

export class AddFriendShowPage {
  public user: User;
  constructor(
    private _navParams: NavParams
  ) {
  }

  ngOnInit() {
    console.debug('AddFriendShowPage ngOnInit');
    this.user = this._navParams.data.user;
    console.log(this.user);
  }
}
