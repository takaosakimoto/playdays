import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class TimeSlot extends ModelBase<TimeSlot> {

  public id: number;
  public date: Date;
  public from: Date;
  public to: Date;
  public eventId: number;
  public trialClassId: number;
  public timeSlotAbleIndex: number;


  deserializeFromJson(json: any): TimeSlot {
    this.id = _.get(json, 'id', 0);
    this.date = new Date(_.get(json, 'date', 0));
    this.from = new Date(_.get(json, 'from', 0));
    this.to = new Date(_.get(json, 'to', 0));
    this.eventId = _.get(json, 'event_id', null);
    this.trialClassId = _.get(json, 'trial_class_id', null);
    this.timeSlotAbleIndex = _.get(json, 'timeSlotAbleIndex', null);
    return this;
  }
}
