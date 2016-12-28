import { Component } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, ControlGroup, FORM_PROVIDERS, FORM_DIRECTIVES } from '@angular/common';
import { Platform, Alert, NavController } from 'ionic-angular/index';
import { Keyboard } from 'ionic-native';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISignupRequest, IFBCurrentUser} from '../../interfaces';
import { Region, District } from '../../models';
import { RegionStore, DistrictStore } from '../../stores';
import { GetFBCurrentUserAction, SignupAction } from '../../actions';
import { ValuePipe } from '../../pipes';
import { TabsPage } from '../tabs/tabs';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [FORM_PROVIDERS, GetFBCurrentUserAction, SignupAction],
  directives: [
    ...FORM_DIRECTIVES
  ],
  pipes: [ValuePipe]
})
export class SignupPage {
  public isLoading: boolean;
  public loadingAlert: Alert;
  public fbUserPictureUrl: string;
  public regions: Array<Region>;
  public districts: Array<District>;
  public displayDistricts: Array<District>;
  public signupForm: ControlGroup;
  public fnameInput: AbstractControl;
  public lnameInput: AbstractControl;
  public emailInput: AbstractControl;
  public passwordInput: AbstractControl;
  public regionIdInput: AbstractControl;
  public districtIdInput: AbstractControl;
  public aboutMeInput: AbstractControl;
  public languagesInput: AbstractControl;
  public mobileNumberInput: AbstractControl;
  public childrenInput = [];
  private regionsSubscription: Subscription;
  private districtsSubscription: Subscription;
  private _signupFormSubscription: Subscription;
  private _picColors: Array<Array<string>>;
  public _firstN:string;
  public _lastN:string;
  public font_C:string;
  public back_C:string;

  constructor(
    private _platform: Platform,
    private _nav: NavController,
    private _formBuilder: FormBuilder,
    private _regionStore: RegionStore,
    private _districtStore: DistrictStore,
    private _getFBCurrentUserAction: GetFBCurrentUserAction,
    private _signupAction: SignupAction
  ) {
  }

  ngOnInit() {
    this._platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
    let _back_colors=['#123123', '#b612bf', '#39a538', '#d6b926', '#26c4d6'];
    let _font_colors=['#ffffff', '#31cbd4', '#ce20b7', '#20ce37', '#ecf129'];
    let pos= Math.floor(Math.random()*5)
    this.back_C=_back_colors[pos];
    this.font_C=_font_colors[pos];
    this._signupFormSubscription = this._setupForm();
    //this._fetchFBInfo();
    this._setupRegionsSubscription();
    this._setupDistrictsSubscription();
  }

  ngAfterViewInit() {
    //
  }

  ionViewDidUnload() {
    console.debug('SignupPage ionViewDidUnload');
    this.regionsSubscription.unsubscribe();
    this.districtsSubscription.unsubscribe();
    this._signupFormSubscription.unsubscribe();
  }

  public goBack() {
    this._nav.pop();
  }

  public addNewChildInput() {
    let currentDate = new Date();
    let dateString = currentDate.toJSON().slice(0, 7);
    this.childrenInput.push({birthday: dateString});
  }

  public removeChildInput(index) {
    this.childrenInput.splice(index, 1);
  }

  public handleDistrictIdInputChange(districtIdI: number) {
    //
  }

  public handleRegionIdInputChange(regionId: number) {
    this.displayDistricts = _.filter(this.districts, ['regionId', this.regionIdInput.value]);
    this.districtIdInput['updateValue']('');
  }

  private _setupForm(): Subscription {
    this.signupForm = this._formBuilder.group({
      fnameInput: ['', Validators.required],
      lnameInput: ['', Validators.required],
      emailInput: ['', Validators.required],
      passwordInput: ['', Validators.required],
      regionIdInput: [''],
      districtIdInput: [''],
      aboutMeInput: [''],
      languagesInput: [''],
      mobileNumberInput: [''],
    });
    this.fnameInput = this.signupForm.controls['fnameInput'];
    this.lnameInput = this.signupForm.controls['lnameInput'];
    this.emailInput = this.signupForm.controls['emailInput'];
    this.passwordInput = this.signupForm.controls['passwordInput'];
    this.regionIdInput = this.signupForm.controls['regionIdInput'];
    this.districtIdInput = this.signupForm.controls['districtIdInput'];
    this.aboutMeInput = this.signupForm.controls['aboutMeInput'];
    this.languagesInput = this.signupForm.controls['languagesInput'];
    this.languagesInput['updateValue']([]);
    this.mobileNumberInput = this.signupForm.controls['mobileNumberInput'];

    let subscription = Observable.fromEvent(document.getElementById('signup-form'), 'submit')
      .debounceTime(2000)
      .do(() => {
        this.isLoading = true;
      })
      .map((c): ISignupRequest => {
        let region_val=this.regionIdInput.value;
        if(region_val==""){
          region_val=null;
        }

        let district_val=this.districtIdInput.value;
        if(district_val==""){
          district_val=null;
        }
        return {
          fname: this.fnameInput.value,
          lname: this.lnameInput.value,
          email: this.emailInput.value,
          region_id: region_val,
          district_id: district_val,
          about_me: this.aboutMeInput.value,
          mobile_phone_number: this.mobileNumberInput.value,
          languages: this.languagesInput.value,
          children: this.childrenInput,
          password: this.passwordInput.value
        };
      })
      .filter(r => this.signupForm.valid)
      .switchMap(d =>
        this._signupAction.execute(d)
          .do(
            d => {
              this.isLoading = false;
              this._showSignupSuccessAlert();
            },
            e => {
              this.isLoading = false;
              this._showSignupErrorAlert();
              console.error('failed to signup', e);
            }
          )
      )
      .subscribe();
    return subscription;
  }

  private _fetchFBInfo() {
    this._getFBCurrentUserAction.success$.subscribe(
      (fbCurrentUser: IFBCurrentUser) => {
        this.fbUserPictureUrl = 'https://graph.facebook.com/v2.6/' + fbCurrentUser.id + '/picture?height=300';
        this._fillInFields(fbCurrentUser);
      }
    );

    this._getFBCurrentUserAction.error$.subscribe(
      (e) => {
        console.error('failed to get fb current user', e);
      }
    );
    this._getFBCurrentUserAction.execute();
  }

  private _setupRegionsSubscription() {
    this.regionsSubscription = this._regionStore.regions$.subscribe(
      (regions: Array<Region>) => {
        this.regions = regions;
      }
    );
  }

  private _setupDistrictsSubscription() {
    this.districtsSubscription = this._districtStore.districts$.subscribe(
      (districts: Array<District>) => {
        this.districts = districts;
      }
    );
  }

  private _fillInFields(fbCurrentUser: IFBCurrentUser) {
    // name input
    if (fbCurrentUser.name) {
      //this.nameInput['updateValue'](fbCurrentUser.name);
    }
    // email input
    if (fbCurrentUser.email) {
      this.emailInput['updateValue'](fbCurrentUser.email);
    }
    // languages input
    // if (fbCurrentUser.languages) {
      // this.languagesInput['updateValue] = fbCurrentUser.languages;
    // }
  }

  private _showSignupSuccessAlert() {
    let alert = Alert.create({
      title: 'Welcome',
      message: 'Signup Success!',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      let navTransition = alert.dismiss();
      navTransition.then(() => {
        console.log('signup success');
        this._nav.setRoot(TabsPage);
      });
    }, 1500);
  }


  private _showSignupErrorAlert() {
    let alert = Alert.create({
      title: 'Signup Failed',
      message: 'Try Again',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

  public updateFirst(ev){
    this._firstN=ev.target.value.charAt(0);
  }

  public updateLast(ev){
    this._lastN=ev.target.value.charAt(0);
  }

}
