import { ViewChild, NgZone, Component } from '@angular/core';
import { Platform, NavController, ViewController, Alert, Tabs } from 'ionic-angular/index';
import { Observable, Subscription } from 'rxjs/Rx';
import { MeStore } from '../../stores';
import { VerifiedAccessToken } from '../../models';
import { VerifyFBAuthenticationAction, FBAuthenticationAndSignupAction } from '../../actions';
import { SignupPage } from '../signup/signup';
import { SigninPage } from '../signin/signin';

@Component({
  templateUrl: 'build/pages/authentication/authentication.html',
  //providers: [VerifyFBAuthenticationAction, FBAuthenticationAndSignupAction],
  providers: [VerifyFBAuthenticationAction],
})

export class AuthenticationPage {
  @ViewChild(Tabs) tabs: Tabs;

  //private _loginWithFBButtonSubscription: Subscription;
  private _verifyFBAuthenticationActionSuccessSubscription: Subscription;
  private _verifyFBAuthenticationActionErrorSubscription: Subscription;
  private _signupWithFBButonSubscription: Subscription;
  private _fbAuthenticationAndSignupActionSuccessSubscription: Subscription;
  private _fbAuthenticationAndSignupActionErrorSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _viewCtrl: ViewController,
    private _meStore: MeStore,
    private _verifyFBAuthenticationAction: VerifyFBAuthenticationAction
    //private _fbAuthenticationAndSignupAction: FBAuthenticationAndSignupAction
  ) {
  }

  ngOnInit() {
    //this._loginWithFBButtonSubscription = this._setupLoginWithFBButton();
    this._verifyFBAuthenticationActionSuccessSubscription = this._setupVerifyFBAuthenticationActionSuccessSubscription();
    this._verifyFBAuthenticationActionErrorSubscription = this._setupVerifyFBAuthenticationActionErrorSubscription();
    //this._signupWithFBButonSubscription = this._setupSignupWithFBButtonSubscription();
    //this._fbAuthenticationAndSignupActionSuccessSubscription = this._setupFbAuthenticationAndSignupActionSuccessSubscription();
    //this._fbAuthenticationAndSignupActionErrorSubscription = this._setupfbAuthenticationAndSignupActionErrorSubscription();
  }

  ionViewDidUnload() {
    console.debug('AuthenticationPage ionViewDidUnload');
    //this._loginWithFBButtonSubscription.unsubscribe();
    this._verifyFBAuthenticationActionSuccessSubscription.unsubscribe();
    this._verifyFBAuthenticationActionErrorSubscription.unsubscribe();
    this._signupWithFBButonSubscription.unsubscribe();
    this._fbAuthenticationAndSignupActionSuccessSubscription.unsubscribe();
    this._fbAuthenticationAndSignupActionErrorSubscription.unsubscribe();
  }

  ngAFterViewInit() {
    console.log(this.tabs);
  }

  public close() {
    this._viewCtrl.dismiss();
    //this._meStore.loggedIn$.first().subscribe(
    //  (hasLoggedIn: boolean): void => {
    //    if (!hasLoggedIn) {
    //      this._switchToDiscoveryTab();
    //    }
    //  }
    //);
  }

  private _setupVerifyFBAuthenticationActionSuccessSubscription(): Subscription {
   return this._verifyFBAuthenticationAction.success$.subscribe(
      (verifiedAccessToken: VerifiedAccessToken) => {
        if (verifiedAccessToken.isValid) {
          this._showLoginSuccessAlert();
        } else {
          this._showLoginErrorAlert();
        }
      }
    );
  }

  private _setupVerifyFBAuthenticationActionErrorSubscription(): Subscription {
    return this._verifyFBAuthenticationAction.error$.subscribe(
      (error) => {
        this._showLoginErrorAlert();
      }
    );
  }

  //private _setupSignupWithFBButtonSubscription(): Subscription {
    //let button = document.getElementById('signup-with-fb-button');
    //return Observable.fromEvent(button, 'click')
    //  .debounceTime(500)
    //  .subscribe(this._fbAuthenticationAndSignupAction);
  //}

  //private _setupFbAuthenticationAndSignupActionSuccessSubscription(): Subscription {
    //return this._fbAuthenticationAndSignupAction.success$.subscribe(
    //  (data) => {
    //    if (data.status === 'connected') {
    //      // check if user is already signup
    //      this.goToSignupPage();
    //    } else {
    //      console.error('FBLoginStatus not connected');
    //    }
    //  }
    //);
  //}

  //private _setupfbAuthenticationAndSignupActionErrorSubscription(): Subscription {
    //return this._fbAuthenticationAndSignupAction.error$.subscribe (
    //  (error) => {
    //    console.log(error);
    //  }
    //);
  //}

  private goToSignupPage() {
    this._nav.push(SignupPage);
  }


  private _switchToDiscoveryTab() {
    console.log(this.tabs);
    let selectedTab = this.tabs.getSelected();
    let discoveryTab = this.tabs['_tabs'][0];
    if (selectedTab !== discoveryTab) {
      this.tabs.select(0);
    }
  }

  private _showLoginSuccessAlert() {
   let alert = Alert.create({
      title: 'Login Successfully',
      message: 'Welcome Back',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      let navTransition = alert.dismiss();
        navTransition.then(() => {
          this._viewCtrl.dismiss();
      });
    }, 1500);
  }


  private _showLoginErrorAlert() {
    let alert = Alert.create({
      title: 'Login Failed',
      message: 'Try Again',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

  public _gotoSignup() {
    this._nav.push(SignupPage);
  }

  public _gotoLogin() {
    this._nav.push(SigninPage);
  }

  //private _setupLoginWithFBButton(): Subscription {
  //  let button = document.getElementById('login-with-fb-button');
  //  return Observable.fromEvent(button, 'click')
  //    .debounceTime(500)
  //    .subscribe(this._verifyFBAuthenticationAction);
  //}
}
