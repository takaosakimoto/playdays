import { Observable } from 'rxjs/Rx';
import { Category } from '../models';
import { CollectionStore } from '../engine/store';

export class CategoryStore extends CollectionStore<Category> {
  constructor() {
    super(Category);
  }

  get categories$(): Observable<Array<Category>> {
    return this.state$;
  }
}
