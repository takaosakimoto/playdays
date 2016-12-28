import { Injectable } from '@angular/core';
import { UpdateEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';
import { Action } from '../../engine/action';
import { IUpdateRequest } from '../../interfaces';
import { Me } from '../../models';

@Injectable()
export class UpdateAction extends Action<IUpdateRequest, Me> {

  constructor(
    private _updateEndpoint: UpdateEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(params: IUpdateRequest): void {
    console.log(params);
    
    //let children_params=params.children;
    //let child_news=[];
    //for(var i=0; i<children_params.length; i++){
    //  child_news[i]=children_params[i]['birthday'];
    //}
    //params.children=child_news;

    this._updateEndpoint.create(params)
      .subscribe(
        (r: Me): void => {
          
          this._meStore.update(r);
          this.success$.next(r);
        },
        e => this.error$.next(e)
      );
  }
}
