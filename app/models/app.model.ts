import { ModelBase } from '../engine/model';
import { IDiretoryFilter, DiretoryFilter } from '../interfaces';

export class App extends ModelBase<App> {

  public id: number = 0;
  public hasReadTutorialPage: boolean = false;

  public hasVisitDiretoryFilerPage = false;
  public diretoryFilter: IDiretoryFilter = new DiretoryFilter();

  deserializeFromJson(): App {
    return this;
  }
}
