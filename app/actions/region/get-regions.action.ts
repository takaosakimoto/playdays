import { Injectable } from '@angular/core';
import { Region } from '../../models';
import { RegionEndpoint } from '../../endpoints';
import { RegionStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetRegionsAction extends ActionNoPayload<Array<Region>> {

  constructor(
    private _regionEndpoint: RegionEndpoint,
    private _regionStore: RegionStore
  ) {
    super();
  }

  onExecute() {
    this._regionEndpoint.fetchMultiple()
      .subscribe(
        (places: Array<Region>) => {
          this._regionStore.saveMany(places);
          this.success$.next(places);
        },
        e => this.error$.next(e)
      );
  }
}
