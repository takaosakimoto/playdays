import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { ICreateCommentRequest } from '../../interfaces';
import { Comment } from '../../models';
import { CommentStore } from '../../stores';
import { CommentEndpoint } from '../../endpoints';
import * as _ from 'lodash';


@Injectable()
export class CreateCommentAction extends Action<ICreateCommentRequest, Comment> {

  constructor(
    private _commentEndpoint: CommentEndpoint,
    private _commentStore: CommentStore
  ) {
    super();
  }

  onExecute(params: ICreateCommentRequest):void {
    console.log(params);
    this._commentEndpoint.create(params)
      .subscribe(
        r => {
          this._commentStore.upsertOne(r);
          this.success$.next(r);
        },
        e => this.error$.next(e)
      );
  }
}
