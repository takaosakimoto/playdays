import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { Region } from '../../../models';
import { RegionStore } from '../../../stores';
import { RegionDistrictCheckBoxListComponent } from '../../../components';

@Component({
  templateUrl: 'build/pages/directory/index/filter-region.html',
  providers: [],
  directives: [
    RegionDistrictCheckBoxListComponent
  ],
})

export class DirectoryIndexFilterRegionPage {

  public regions: Array<Region> = [];
  public selectedDistrictIds: Array<number> = [];

  private _regionsSubscription: Subscription;

  constructor(
    private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _regionStore: RegionStore
  ) {
    this.selectedDistrictIds = this._navParams.get('selectedDistrictIds');
    console.log('yah');
    console.log(this.selectedDistrictIds);
    this._regionsSubscription = this._setupRegionsSubscription();
  }

  ionViewDidUnload() {
    console.debug('DirectoryIndexFilterRegionPage ionViewDidUnload');
    this._regionsSubscription.unsubscribe();
  }

  public hanldeCloseButtonClicked(): void {
    this._viewCtrl.dismiss();
  }

  public handleOkButtonClicked(): void {
    this._viewCtrl.dismiss(this.selectedDistrictIds);
  }

  public handleCheckboxChange(ids: Array<number>): void {
    this.selectedDistrictIds = ids;
  }

  private _setupRegionsSubscription(): Subscription {
    return this._regionStore.regions$.subscribe((regions: Array<Region>): void => {
      this.regions = regions;
    });
  }
}
