import { Injectable } from '@angular/core';
import { Place } from '../../models';
import { PlaceEndpoint } from '../../endpoints';
import { PlaceStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetPlacesAction extends ActionNoPayload<Array<Place>> {

  constructor(
    private _placeEndpoint: PlaceEndpoint,
    private _placeStore: PlaceStore
  ) {
    super();
  }

  onExecute() {
    this._placeEndpoint.fetchMultiple()
      .subscribe(
        (places: Array<Place>) => {
          this._placeStore.saveMany(places);
          this.success$.next(places);
        },
        e => this.error$.next(e)
      );
  }
}
