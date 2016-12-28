import {
  Directive,
  EventEmitter,
  Output,
  HostListener
} from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { MeStore } from '../stores';
import { AuthenticationPage } from '../pages/authentication/authentication';
@Directive({
  selector: '[protected]',
})

export class ProtectedDirective {
  @Output() protectedOnClick: EventEmitter<any> = new EventEmitter();
  private _loggedIn;
  private subscription: Subscription;

  constructor(
    private _nav: NavController,
    private _meStore: MeStore
  ) {
    this.subscription = this._meStore.loggedIn$
                          .subscribe(
                            (loggedIn) => {
                              this._loggedIn = loggedIn;
                            }
                          );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('click', ['$event'])
  click(ev) {
    ev.stopPropagation();
    if (!this._loggedIn) {
      ev.preventDefault();
      this._showAuthenticationModal();
    } else {
      this.protectedOnClick.emit(ev);
    }
  }

  private _showAuthenticationModal() {
    let modal = Modal.create(AuthenticationPage);
    this._nav.present(modal);
  }

}
