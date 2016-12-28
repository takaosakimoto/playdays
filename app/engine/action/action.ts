import { Observable, Subject } from 'rxjs/Rx';

export abstract class Action<RequestType, ResponseType> extends Subject<RequestType> {

  public success$ = new Subject<ResponseType>();
  public error$ = new Subject<any>();

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
        this.onExecute(d);
      },
      e => console.error(`[${this._actionName}] error when executing action`, e),
      () => console.debug('action completed')
    );
  }

  execute(t: RequestType): Observable<ResponseType> {
    let s = new Subject<ResponseType>();
    this.success$.subscribe(d => s.next(d));
    this.error$.subscribe(e => s.error(e));
    this.next(t);
    return s;
  }

  abstract onExecute(t: RequestType): void;
}
