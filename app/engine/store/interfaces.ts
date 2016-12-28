export interface ReduceFunc<T> {
  (old: T): T;
}

export interface ISerializable<T> {
  deserializeFromJson(json: any): T;
  afterStoreDeserialize(): void;
}

export interface ObjectWithId<T> extends ISerializable<T> {
  id: number | string;
}
