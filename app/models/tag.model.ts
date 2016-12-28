import * as _ from 'lodash';
import { ModelBase } from '../engine/model';


export class Tag extends ModelBase<Tag> {

  public id: number;
  public title: string;

  deserializeFromJson(json: any): Tag {
    this.id = _.get(json, 'id', 0);
    this.title = _.get(json, 'title', '');
    return this;
  }
}
