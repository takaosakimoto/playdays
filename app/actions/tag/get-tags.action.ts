import { Injectable } from '@angular/core';
import { Tag } from '../../models';
import { TagEndpoint } from '../../endpoints';
import { TagStore } from '../../stores';
import { ActionNoPayload } from '../../engine/action';

@Injectable()
export class GetTagsAction extends ActionNoPayload<Array<Tag>> {

  constructor(
    private _tagEndpoint: TagEndpoint,
    private _tagStore: TagStore
  ) {
    super();
  }

  onExecute() {
    this._tagEndpoint.fetchMultiple()
      .subscribe(
        (tags: Array<Tag>) => {
          this._tagStore.saveMany(tags);
          this.success$.next(tags);
        },
        e => this.error$.next(e)
      );
  }
}
