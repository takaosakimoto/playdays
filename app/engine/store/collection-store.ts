import {
  Subject,
  BehaviorSubject,
  Observable
} from 'rxjs/Rx';
import * as _ from 'lodash';
import {ReduceFunc, ObjectWithId} from './interfaces';

// TODO immutable state
// TODO measure change detection performance?
// TODO use decorator to register a reducer

export abstract class CollectionStore<T extends ObjectWithId<any>> {

  protected _initialState: Array<T> = new Array<T>();

  protected _state$: Observable<Array<T>>;
  protected _reducer$: Subject<ReduceFunc<Array<T>>>;

  // reducers
  protected _echo$: Subject<boolean> = new Subject<boolean>();
  protected _saveMany$ = new Subject<Array<T>>();
  protected _saveOne$ = new Subject<T>();
  protected _destroy$ = new Subject<any>();
  // the class name that instantiate this generic
  protected _storeName = this.constructor.toString().match(/\w+/g)[1];

  constructor(private newFn: {new(): T}) {
    this._deserialize();

    // echo initial state to new observer of state$
    this._reducer$ = new BehaviorSubject<ReduceFunc<Array<T>>>((t: Array<T>) => t);

    // what scan does: http://reactivex.io/documentation/operators/scan.html
    this._state$ = this._reducer$
      .scan((t: Array<T>, f: ReduceFunc<Array<T>>) => f(t), this._initialState)
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

  saveMany(objects: Array<T>) {
    this._saveMany$.next(objects);
  }

  saveOne(object: T) {
    this._saveOne$.next(object);
  }

  destroy() {
    this._destroy$.next(true);
  }

  upsertMany(objects: Array<T>) {
    this._saveMany$.next(objects);
  }

  upsertOne(object: T) {
    this._saveOne$.next(object);
  }

  getOne$(id: number): Observable<T> {
    return this.state$
      .flatMap<T>(objs => {
        return Observable.of(_.find(objs, {id: id}));
      });
  }

  private _registerReducers() {
    this._echo$
      .map((unuse: boolean): ReduceFunc<Array<T>> => (old: Array<T>) => old)
      .subscribe(this._reducer$);

    this._saveMany$
      .map((objects: Array<T>): ReduceFunc<Array<T>> => {
        return (oldArray: Array<T>): Array<T> => {
          let newArray = _.clone(oldArray);
          let differences = _['differenceBy'](oldArray, objects, 'id');
          _.each(differences, (object: T) => {
            var index = _.findIndex(newArray, ['id', object.id]);
            newArray.splice(index, 1);
          });

          _.each(objects, (object) => {
            var index = _.findIndex(newArray, ['id', object.id]);
            if (index === -1) {
              newArray.push(<T>_.extend(new this.newFn(), object));
            } else {
              newArray.splice(index, 1, object);
            }
          });
          return newArray;
        };
      })
      .subscribe(this._reducer$);

    this._saveOne$
      .map((object: T): ReduceFunc<Array<T>> => {
        return (oldArray: Array<T>): Array<T> => {
          let newArray = _.clone(oldArray);
          var index = _.findIndex(newArray, ['id', object.id]);
          if (index === -1) {
            newArray.push(<T>_.extend(new this.newFn(), object));
          } else {
            newArray.splice(index, 1, object);
          }
          return newArray;
        };
      })
      .subscribe(this._reducer$);

    this._destroy$
      .map((objects: Array<T>): ReduceFunc<Array<T>> => (oldArray: Array<T>) => [])
      .subscribe(this._reducer$);
  }

  private _serialize(d: Array<T>) {
    localStorage.setItem(this._storeName, JSON.stringify(d));
  }

  private _deserialize() {
    var objects = <Array<T>>(JSON.parse(localStorage.getItem(this._storeName)) || []);
    this._initialState = <Array<T>>objects.map(object => {
      var instance = <T>_.extend(new this.newFn(), object);
      instance.afterStoreDeserialize();
      return instance;
    });
  }
}
