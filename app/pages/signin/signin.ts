import { Component, ViewChild } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, ControlGroup, FORM_PROVIDERS, FORM_DIRECTIVES } from '@angular/common';
import { Platform, Alert, NavController, ViewController, Tabs} from 'ionic-angular/index';
import { Keyboard } from 'ionic-native';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISigninRequest} from '../../interfaces';
import { MeStore, RegionStore } from '../../stores';
import { SigninAction } from '../../actions';
import { ValuePipe } from '../../pipes';
import { TabsPage } from '../tabs/tabs';
import * as _ from 'lodash';
import { Region } from '../../models';

@Component({
  templateUrl: 'build/pages/signin/signin.html',
  providers: [FORM_PROVIDERS, SigninAction],
  directives: [
    ...FORM_DIRECTIVES
  ],
  pipes: [ValuePipe]
})
export class SigninPage {
  @ViewChild(Tabs) tabs: Tabs;

  public isLoading: boolean;
  public loadingAlert: Alert;
  public emailInput: AbstractControl;
  public passwordInput: AbstractControl;
  public signinForm: ControlGroup;
  private _signinFormSubscription: Subscription;
  private regionsSubscription: Subscription;
  public regions: Array<Region>;
  private _userCreds: ISigninRequest;

  constructor(
    private _platform: Platform,
    private _nav: NavController,
    private _meStore: MeStore,
    private _regionStore: RegionStore,
    private _formBuilder: FormBuilder,
    private _signinAction: SigninAction,
    private _viewCtrl: ViewController
  ) {
  }

  ngOnInit() {
    this._platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
    this._userCreds ={
      email: '',
      password: '',
    };
    this.isLoading=true;
    //this._signinFormSubscription = this._setupForm();
  }

  ngAfterViewInit() {
    //
  }

  ionViewDidUnload() {
    console.debug('SigninPage ionViewDidUnload');
    //this._signinFormSubscription.unsubscribe();
  }

  public goBack() {
    this._nav.pop();
  }

  private _setupForm(): Subscription {
    this.signinForm = this._formBuilder.group({
      emailInput: ['', Validators.required],
      passwordInput: ['', Validators.required],
    });
    this.emailInput = this.signinForm.controls['emailInput'];
    this.passwordInput = this.signinForm.controls['passwordInput'];

    console.log('signining');
    let subscription = Observable.fromEvent(document.getElementsByClassName('signin-form')[0], 'submit')
      .debounceTime(100)
      .do(() => {
        console.log('dsfdsdf');
        this.isLoading = true;
      })
      .map((c): ISigninRequest => {
        return {
          email: this.emailInput.value,
          password: this.passwordInput.value
        };
      })
      .filter(r => this.signinForm.valid)
      .switchMap(d =>
        this._signinAction.execute(d)
          .do(
            d => {
              this.isLoading = false;
              this._showSigninSuccessAlert();
            },
            e => {
              this.isLoading = false;
              this._showSigninErrorAlert();
              console.error('failed to signup', e);
            }
          )
      )
      .subscribe();
    return subscription;
  }

  private _showSigninSuccessAlert() {
    let alert = Alert.create({
      title: 'Login Successfully',
      message: 'Welcome Back',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {

      let navTransition = alert.dismiss();
        navTransition.then(() => {
          console.log('sigin success');
          this._nav.push(TabsPage);
      });
    }, 1500);
  }


  private _showSigninErrorAlert() {
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

  private _switchToDiscoveryTab() {
    console.log(this.tabs);
    let selectedTab = this.tabs.getSelected();
    this.tabs.select(3);
  }

  login(creds){
    this.isLoading = true;
    this._signinAction.execute(creds);
    
    setTimeout(() => {
      if(window.localStorage.getItem('authorized')=='activated'){
        this.isLoading = false;
        this._showSigninSuccessAlert();
      }else{
        console.log(window.localStorage.getItem('authorized'));
        this.isLoading = false;
        this._showSigninErrorAlert();
        this._userCreds.email='';
        this._userCreds.password='';
      }
    }, 2500);

    //if(this._signinAction.execute_res(creds)){
    //  this.isLoading = false;
    //  this._showSigninSuccessAlert();
    //}else{
    //  console.log(window.localStorage.getItem('authorized'));
    //  this.isLoading = false;
    //  this._showSigninErrorAlert();
    //  this._userCreds.email='';
    //  this._userCreds.password='';
    //}
  }

  slowLogin(){
    if(window.localStorage.getItem('authorized')=='activated'){
      this.isLoading = false;
      this._showSigninSuccessAlert();
    }else{
      console.log(window.localStorage.getItem('authorized'));
      this.isLoading = false;
      this._showSigninErrorAlert();
      this._userCreds.email='';
      this._userCreds.password='';
    }
  }

  validate_submit(){
    if(this._userCreds.email!='' && this._userCreds.password!='')
      this.isLoading=false;
    else
      this.isLoading=true;
  }

}
