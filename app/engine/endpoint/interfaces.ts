import { ISerializable } from '../store';

// TODO restrict json type from any
export interface ConstructFromJson {
  json: any;
}

export interface JsonConstructable<T extends ISerializable<any>> {
  new(json?: any): T;
}
