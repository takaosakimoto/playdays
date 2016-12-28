import { Injectable } from '@angular/core';
import { District } from '../../models';
import { DistrictEndpoint } from '../../endpoints';
import { DistrictStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetDistrictsAction extends ActionNoPayload<Array<District>> {

  constructor(
    private _districtEndpoint: DistrictEndpoint,
    private _districtStore: DistrictStore
  ) {
    super();
  }

  onExecute() {
    this._districtEndpoint.fetchMultiple()
      .subscribe(
        (places: Array<District>) => {
          this._districtStore.saveMany(places);
          this.success$.next(places);
        },
        e => this.error$.next(e)
      );
  }
}
