import { Observable } from 'rxjs/Rx';
import { ObjectStore } from '../engine/store';
import { App } from '../models';
import { IDiretoryFilter } from '../interfaces';

export class AppStore extends ObjectStore<App> {

  constructor() {
    super(App);
  }

  public get hasReadTutorialPage$(): Observable<boolean> {
    return this._state$.map(s => s.hasReadTutorialPage);
  }

  public get hasVisitDiretoryFilerPage$(): Observable<boolean> {
    return this._state$.map(s => s.hasVisitDiretoryFilerPage);
  }

  public get diretoryFilter$(): Observable<IDiretoryFilter> {
    return this._state$.map(s => s.diretoryFilter);
  }

  public get app$(): Observable<App> {
    return this._state$;
  }
}
