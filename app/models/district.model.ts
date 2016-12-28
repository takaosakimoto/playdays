import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class District extends ModelBase<District> {

  public id: number;
  public name: string;
  public hexColorCode: string;
  public regionId: string;

  deserializeFromJson(json: any): District {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.regionId = _.get(json, 'region_id', '');
    this.hexColorCode = _.get(json, 'hex_color_code', '');

    return this;
  }
}
