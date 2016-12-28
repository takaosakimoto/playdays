import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { TimeSlot } from './time-slot.model';

export class TrialClass extends ModelBase<TrialClass> {

  public id: number;
  public name: string;
  public websiteUrl: string;
  public contactNumber: string;
  public locationAddress: string;
  public description: string;
  public timeSlots: Array<TimeSlot>;
  public image: string;
  public lat: string;
  public long: string;

  deserializeFromJson(json: any): TrialClass {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.websiteUrl = _.get(json, 'website_url', '');
    this.contactNumber = _.get(json, 'contact_number', '');
    this.locationAddress = _.get(json, 'location_address', '');
    this.description = _.get(json, 'description', '');
    this.image = _.get(json, 'image', '');
    this.lat = _.get(json, 'lat', '0.0000000');
    this.long = _.get(json, 'long', '0.0000000');
    this.timeSlots = _.map(
      _.get(json, 'time_slots', []),
      (timeSlot) => (new TimeSlot(timeSlot))
    );
    return this;
  }
}
