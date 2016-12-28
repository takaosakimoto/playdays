import { Component } from '@angular/core';
import { Page, NavController } from 'ionic-angular/index';
import { Platform } from 'ionic-angular';
import { AppStore } from '../../stores';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  public sliderOptions = {
    initialSlide: 0,
    autoHeight: true,
  };
  constructor(
    private _nav: NavController,
    private _platform: Platform,
    private _appStore: AppStore
  ) {
  }

  ngOnInit() {
    //
  }

  ionViewWillLeave() {
    //
  }

  goToTabsPage() {
    this._nav.setRoot(TabsPage).then(data => {
      this._appStore.update({
        hasReadTutorialPage: true
      });
    });
  }
}
