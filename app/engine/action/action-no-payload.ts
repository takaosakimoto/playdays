import { Observable, Subject } from 'rxjs/Rx';

export abstract class ActionNoPayload<ResponseType> extends Subject<boolean> {

  public success$ =  new Subject<ResponseType>();
  public error$ =  new Subject<any>();

  // the class name that instantiate this generic
  protected _actionName = this.constructor.toString().match(/\w+/g)[1];

  constructor() {
    super();

    this.error$.subscribe(e => {
      console.error(`[${this._actionName}] error when executing action`, e);
    });

    this.subscribe(
      d => {
        console.debug(`[${this._actionName}] executing action`);
        this.onExecute();
      },
      e => console.error(`[${this._actionName}] error firing action`, e),
      () => console.debug('action completed')
    );
  }

  execute(): Observable<ResponseType> {
    let s = new Subject<ResponseType>();
    this.success$.subscribe(d => s.next(d));
    this.error$.subscribe(e => s.error(e));
    this.next(true);
    return s;
  }


  abstract onExecute(): void;
}
