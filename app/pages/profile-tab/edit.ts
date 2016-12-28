import { Component } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, ControlGroup, FORM_PROVIDERS, FORM_DIRECTIVES } from '@angular/common';
import { Platform, Alert, NavController, NavParams } from 'ionic-angular/index';
import { Keyboard } from 'ionic-native';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISignupRequest, IFBCurrentUser } from '../../interfaces';
import { Me, Region, District } from '../../models';
import { RegionStore, DistrictStore } from '../../stores';
import { UpdateMeAction } from '../../actions';
import { Toast } from '../../utils/toast';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/profile-tab/edit.html',
  providers: [FORM_PROVIDERS, UpdateMeAction],
})
export class ProfileEditPage {
  public isLoading: boolean;
  public loadingAlert: Alert;
  public regions: Array<Region>;
  public districts: Array<District>;
  public displayDistricts: Array<District>;
  public signupForm: ControlGroup;
  public fnameInput: AbstractControl;
  public lnameInput: AbstractControl;
  public emailInput: AbstractControl;
  public regionIdInput: AbstractControl;
  public districtIdInput: AbstractControl;
  public aboutMeInput: AbstractControl;
  public languagesInput: AbstractControl;
  public mobileNumberInput: AbstractControl;
  public passwordInput: AbstractControl;
  public childrenInput = [];
  private regionsSubscription: Subscription;
  private districtsSubscription: Subscription;
  private _signupFormSubscription: Subscription;

  constructor(
    private _platform: Platform,
    private _nav: NavController,
    private _navParams: NavParams,
    private _formBuilder: FormBuilder,
    private _regionStore: RegionStore,
    private _districtStore: DistrictStore,
    private _updateMeAction: UpdateMeAction,
    private _toast: Toast
  ) {
  }

  ngOnInit() {
    this._platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
    this._signupFormSubscription = this._setupForm();

    this._setupRegionsSubscription();

    this._setupDistrictsSubscription();
    console.log('test.................');
  }

  ngAfterViewInit() {
    //
  }

  ionViewDidUnload() {
    console.debug('DirectoryIndexPage ionViewDidUnload');
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
    const me:Me = this._navParams.data.me;
    //this.fbUserPictureUrl = me.fbUserPictureUrl;
    this.signupForm = this._formBuilder.group({
      fnameInput: [me.fname, Validators.required],
      lnameInput: [me.lname, Validators.required],
      emailInput: [me.email, Validators.required],
      passwordInput: [me.password, Validators.required],
      regionIdInput: [me.region_id, Validators.required],
      districtIdInput: [me.district_id, Validators.required],
      aboutMeInput: [me.aboutMe],
      languagesInput: [me.languages],
      mobileNumberInput: [me.mobilePhoneNumber],
    });
    this.fnameInput = this.signupForm.controls['fnameInput'];
    this.lnameInput = this.signupForm.controls['lnameInput'];
    this.emailInput = this.signupForm.controls['emailInput'];
    this.regionIdInput = this.signupForm.controls['regionIdInput'];
    this.districtIdInput = this.signupForm.controls['districtIdInput'];
    this.aboutMeInput = this.signupForm.controls['aboutMeInput'];
    this.languagesInput = this.signupForm.controls['languagesInput'];
    this.mobileNumberInput = this.signupForm.controls['mobileNumberInput'];
    this.passwordInput=this.signupForm.controls['passwordInput'];

    this.childrenInput = me.children;


    let subscription = Observable.fromEvent(document.getElementById('signup-form'), 'submit')
      .debounceTime(2000)
      .do(() => {
        this.isLoading = true;
      })
      .map((c): ISignupRequest => {
        return {
          fname: this.fnameInput.value,
          lname: this.lnameInput.value,
          email: this.emailInput.value,
          region_id: this.regionIdInput.value,
          district_id: this.districtIdInput.value,
          about_me: this.aboutMeInput.value,
          mobile_phone_number: this.mobileNumberInput.value,
          languages: this.languagesInput.value,
          children: this.childrenInput,
          password: this.passwordInput,
        };
      })
      .filter(r => this.signupForm.valid)
      .switchMap(d =>
        this._updateMeAction.execute(d)
          .do(
            d => {
              this.isLoading = false;
              this.goBack();
              this._toast.create('You have updated your profile.');
            },
            e => {
              this.isLoading = false;
              this._showUpdateErrorAlert();
              console.error('failed to update profile', e);
            }
          )
      )
      .subscribe();

    return subscription;
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
        this.displayDistricts=this.districts;
        //this.displayDistricts = _.filter(
        //  this.districts, ['regionId', this._navParams.data.me.region.id]
        //);
      }
    );
  }

  private _showUpdateErrorAlert() {
    let alert = Alert.create({
      title: 'Update Failed',
      message: 'Try Again',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

}
