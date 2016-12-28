import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/index';
import { Platform } from 'ionic-angular';
import {
  GetCategoriesAction,
  GetPlacesAction,
  GetRegionsAction,
  GetDistrictsAction,
  GetTagsAction,
  VerifyFBAuthenticationAction,
  GetPublicEventsAction,
  GetTrialClassesAction } from '../../actions';
import { AppStore } from '../../stores';
import { TutorialPage } from '../tutorial/tutorial';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/splash/splash.html',
  providers: [
    GetCategoriesAction,
    GetDistrictsAction,
    GetPlacesAction,
    GetPublicEventsAction,
    GetRegionsAction,
    GetTagsAction,
    GetTrialClassesAction,
    VerifyFBAuthenticationAction,
  ]
})
export class SplashPage {

  constructor(
    private _nav: NavController,
    private _platform: Platform,
    private _getCategoriesAction: GetCategoriesAction,
    private _getTagsAction: GetTagsAction,
    private _getPlacesAction: GetPlacesAction,
    private _getRegionsAction: GetRegionsAction,
    private _getDistrictsAction: GetDistrictsAction,
    private _getPublicEventsAction: GetPublicEventsAction,
    private _getTrialClassesAction: GetTrialClassesAction,

    private _verifyFBAuthenticationAction: VerifyFBAuthenticationAction,
    private _appStore: AppStore
  ) {
  }

  ngOnInit() {
    console.debug('SplashPage OnInt');
    this._platform.ready().then(() => {
      this._goToFirstPage();
    });
    this._getCategoriesAction.execute();
    this._getTagsAction.execute();
    this._getDistrictsAction.execute();
    this._getPlacesAction.execute();
    this._getPublicEventsAction.execute();
    this._getRegionsAction.execute();
    this._getTrialClassesAction.execute();
  }

  private _goToFirstPage() {
    this._appStore.hasReadTutorialPage$.first().subscribe(
      (hasReadTutorial: boolean) => {
        if (hasReadTutorial) {
          this._nav.setRoot(TabsPage);
        } else {
          this._nav.setRoot(TutorialPage);
        }
      }
    );
  }
}
