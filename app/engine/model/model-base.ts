import { ISerializable } from '../store';

export abstract class ModelBase<T> implements ISerializable<T> {

  constructor(json?: any) {
    if (json) {
      this.deserializeFromJson(json);
    }
  }

  abstract deserializeFromJson(json: any): T;
  /* tslint:disable:no-empty */
  afterStoreDeserialize() {}
  /* tslint:enable */
}
