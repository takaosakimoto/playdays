import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { TimeSlot } from './time-slot.model';
import { EventTag } from './event-tag.model';

export class PublicEvent extends ModelBase<PublicEvent> {

  public id: number;
  public name: string;
  public websiteUrl: string;
  public bookingUrl: string;
  public bookingHotline: string;
  public bookingEmail: string;
  public contactNumber: string;
  public locationAddress: string;
  public description: string;
  public isFeatured: boolean;
  public image: string;
  public lat: string;
  public long: string;
  public priceRange: {hi: number, lo: number};
  public priceString: string;
  public timeSlots: Array<TimeSlot>;
  public joinedConsumerNumber: number;
  public eventTags: Array<EventTag>;

  deserializeFromJson(json: any): PublicEvent {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.websiteUrl = _.get(json, 'website_url', '');
    this.bookingUrl = _.get(json, 'booking_url', '');
    this.bookingHotline = _.get(json, 'booking_hotline', '');
    this.bookingEmail = _.get(json, 'booking_email', '');
    this.contactNumber = _.get(json, 'contact_number', '');
    this.locationAddress = _.get(json, 'location_address', '');
    this.description = _.get(json, 'description', '');
    this.image = _.get(json, 'image', '');
    this.isFeatured = _.get(json, 'is_featured', false);
    this.lat = _.get(json, 'lat', '0.0000000');
    this.long = _.get(json, 'long', '0.0000000');
    this.priceRange = _.get(json, 'price_range', {hi: 0, lo: 0});
    let eventTags = _.get(json, 'event_tags', []);
    this.eventTags = eventTags.map(t => new EventTag(t));
    this.timeSlots = _.map(
      _.get(json, 'time_slots', []),
      (timeSlot) => (new TimeSlot(timeSlot))
    );
    this.joinedConsumerNumber = _.get(json, 'joined_consumer_number', 0);

    if (this.priceRange.hi === this.priceRange.lo) {
      this.priceString = '$' + this.priceRange.hi;
    }else {
      this.priceString = '$' + this.priceRange.lo + ' - ' + '$' + this.priceRange.hi;
    }

    return this;
  }
}
