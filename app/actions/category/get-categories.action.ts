import { Injectable } from '@angular/core';
import { Category } from '../../models';
import { CategoryEndpoint } from '../../endpoints';
import { CategoryStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetCategoriesAction extends ActionNoPayload<Array<Category>> {

  constructor(
    private _categoryEndpoint: CategoryEndpoint,
    private _categoryStore: CategoryStore
  ) {
    super();
  }

  onExecute() {
    this._categoryEndpoint.fetchMultiple()
      .subscribe(
        (categories: Array<Category>) => {
          this._categoryStore.saveMany(categories);
          this.success$.next(categories);
        },
        e => this.error$.next(e)
      );
  }
}
