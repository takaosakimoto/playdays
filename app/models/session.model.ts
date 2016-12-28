import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { TimeSlot } from './index'

interface SessionTimeSlot {
  id: number;
  date: Date;
  from: Date;
  to: Date;
  publicEvent: {
    id: number,
    name: string,
    contactNumber: string,
    locationAddress: string,
    image: string,
    // websiteUrl: string,
    // description: string,
    // priceRange: {hi: number, lo: number},
    // priceString: string,
    // timeSlots: Array<TimeSlot>,
  };
  trialClass: {
    id: number,
    name: string,
    contactNumber: string,
    locationAddress: string,
    description: string,
    image: string
    // websiteUrl: string,
    // timeSlots: Array<TimeSlot>,
  };
}

export class Session extends ModelBase<Session> {

  public id: number;
  public status: String;
  public timeSlot: SessionTimeSlot;

  deserializeFromJson(json: any): Session {
    this.id = _.get(json, 'id', 0);
    this.status = _.get(json, 'status', '');
    this.timeSlot = {
      id: _.get(json, 'time_slot.id', 0),
      from: _.get(json, 'time_slot.from', new Date),
      to: _.get(json, 'time_slot.to', new Date),
      date: _.get(json, 'time_slot.date', new Date),
      publicEvent: json.time_slot.event ? {
        id: _.get(json, 'time_slot.event.id', 0),
        name: _.get(json, 'time_slot.event.name', ''),
        locationAddress: _.get(json, 'time_slot.event.location_address', ''),
        image: _.get(json, 'time_slot.event.image', ''),
        contactNumber: _.get(json, 'time_slot.event.contact_number', ''),
        // websiteUrl: null,
        // priceString: null,
        // description: null,
        // timeSlots: null,
      } : null,
      trialClass: json.time_slot.trial_class ? {
        id: _.get(json, 'time_slot.trial_class.id', 0),
        name: _.get(json, 'time_slot.trial_class.name', ''),
        locationAddress: _.get(json, 'time_slot.trial_class.location_address', ''),
        image: _.get(json, 'time_slot.trial_class.image', ''),
        contactNumber: _.get(json, 'time_slot.trial_class.contact_number', ''),
        description: _.get(json, 'time_slot.trial_class.description', ''),
        // website_url: null,
        // description: null,
        // timeSlots: null,
      } : null,
    }

    return this;
  }
}
