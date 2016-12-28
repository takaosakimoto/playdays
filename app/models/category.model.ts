import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class Category extends ModelBase<Category> {

  public id: number;
  public title: string;
  public hexColorCode: string;
  public image: string;

  deserializeFromJson(json: any): Category {
    this.id = _.get(json, 'id', 0);
    this.title = _.get(json, 'title', '');
    this.hexColorCode = _.get(json, 'hex_color_code', '');
    this.image = _.get(json, 'image', '');

    return this;
  }
}
