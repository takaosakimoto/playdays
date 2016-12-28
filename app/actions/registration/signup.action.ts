import { Injectable } from '@angular/core';
import { RegistrationEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';
import { Action } from '../../engine/action';
import { ISignupRequest } from '../../interfaces';
import { Me } from '../../models';

@Injectable()
export class SignupAction extends Action<ISignupRequest, Me> {

  constructor(
    private _registrationEndpoint: RegistrationEndpoint,
    private _meStore: MeStore
  ) {
    super();
  }

  onExecute(params: ISignupRequest): void {
    console.log(params);
    
    let children_params=params.children;
    let child_news=[];
    for(var i=0; i<children_params.length; i++){
      child_news[i]=children_params[i]['birthday'];
    }
    params.children=child_news;

    this._registrationEndpoint.create(params)
      .subscribe(
        (r: Me): void => {
          
          this._meStore.update(r);
          this.success$.next(r);
        },
        e => this.error$.next(e)
      );
  }
}
