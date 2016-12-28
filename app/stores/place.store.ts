import { Observable } from 'rxjs/Rx';
import { Place } from '../models';
import { CollectionStore } from '../engine/store';

export class PlaceStore extends CollectionStore<Place> {
  constructor() {
    super(Place);
  }

  sortByName(a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  }

  get places$(): Observable<Array<Place>> {
    return this.state$.map(places => places.sort(this.sortByName));
  }

  get isFeaturedPlaces$(): Observable<Array<Place>> {
    return this.state$.map((places: Array<Place>): Array<Place> => {
      return _.filter(places, ['isFeatured', true]);
    });
  }
}
