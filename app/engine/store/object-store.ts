import * as _ from 'lodash';
import { Subject } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import {ReduceFunc, ObjectWithId} from './interfaces';

// TODO immutable state
// TODO measure change detection performance?
// TODO use decorator to register a reducer

export abstract class ObjectStore<T extends ObjectWithId<any>> {

  protected _initialState = <T>{};

  protected _state$: Observable<T>;
  protected _reducer$: Subject<ReduceFunc<T>>;

  // reducers
  protected _echo$ = new Subject<boolean>();
  protected _create$ = new Subject<T>();
  protected _update$ = new Subject<Object>();
  protected _destroy$  = new Subject<any>();

  // the class name that instantiate this generic
  protected _storeName = this.constructor.toString().match(/\w+/g)[1];

  constructor(private newFn: {new(): T}) {
    this._deserialize();

    // echo initial state to new observer of state$
    this._reducer$ = new BehaviorSubject<ReduceFunc<T>>((t: T) => t);

    // what scan does: http://reactivex.io/documentation/operators/scan.html
    this._state$ = this._reducer$
      .scan((t: T, f: ReduceFunc<T>) => f(t), this._initialState)
      .publishReplay(1)
      .refCount();

    this._registerReducers();

    // logger
    this._state$.subscribe(
      d => console.debug(`[${this._storeName}] state changed`, d)
    );

    // persistent storage
    this._state$.subscribe(
      d => this._serialize(d)
    );
  }

  get state$() {
    return this._state$;
  }

  echo() {
    this._echo$.next(true);
  }

  create(t: T) {
    this._create$.next(t);
  }

  update(args: any) {
    this._update$.next(args);
  }

  destroy() {
    this._destroy$.next(true);
  }

  // transform 'stream of T' into 'stream of transformation of T'
  // TODO use decorator to register a reducer
  private _registerReducers() {
    this._echo$
      .map((unuse: boolean): ReduceFunc<T> => ((old: T) => old))
      .subscribe(this._reducer$);

    this._create$
      .map((t: T): ReduceFunc<T> => ((old: T) => _.clone(t)))
      .subscribe(this._reducer$);

    this._update$
      .map((obj: Object): ReduceFunc<T> => ((old: T) => <T>_.extend(old, obj)))
      .subscribe(this._reducer$);

    this._destroy$
      .map((obj: Object): ReduceFunc<T> => ((old: T) => <T>new Object()))
      .subscribe(this._reducer$);
  }

  private _serialize(d: T) {
    localStorage.setItem(this._storeName, JSON.stringify(d));
  }

  private _deserialize() {
    var data = JSON.parse(localStorage.getItem(this._storeName)) || {};
    var instance = <T>_.extend(new this.newFn(), data);
    instance.afterStoreDeserialize();
    this._initialState = instance;
  }
}
