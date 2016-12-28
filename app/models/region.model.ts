
import { ModelBase } from '../engine/model';
import { District } from './district.model';
import * as _ from 'lodash';

export class Region extends ModelBase<Region> {

  public id: number;
  public name: string;
  public hexColorCode: string;
  public districts: Array<District> = [];


  deserializeFromJson(json: any): Region {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.hexColorCode = _.get(json, 'hexColorCode', '');
    let districts = _.get(json, 'districts', []);
    this.districts = districts.map((d) => new District(d));

    return this;
  }
}
