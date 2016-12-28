import { ModelBase } from '../engine/model';
import * as _ from 'lodash';

export class Device extends ModelBase<Device> {

  public uuid: string;

  deserializeFromJson(json: any): Device {
    this.uuid = _.get(json, 'uuid', '');
    return this;
  }
}
