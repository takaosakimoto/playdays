import * as _ from 'lodash';
import { ModelBase } from '../engine/model';


export class EventTag extends ModelBase<EventTag> {

  public id: number;
  public title: string;

  deserializeFromJson(json: any): EventTag {
    this.id = _.get(json, 'id', 0);
    this.title = _.get(json, 'title', '');
    return this;
  }
}
