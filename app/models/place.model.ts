import * as _ from 'lodash';
import { ModelBase } from '../engine/model';
import { District } from './district.model';
import { Category } from './category.model';
import { Tag } from './tag.model';

export class Place extends ModelBase<Place> {

  public id: number;
  public name: string;
  public websiteUrl: string;
  public contactNumber: string;
  public locationAddress: string;
  public description: string;
  public image: string;
  public lat: string;
  public long: string;
  public isFeatured: boolean;
  public districts: Array<District>;
  public categories: Array<Category>;
  public tags: Array<Tag>;


  deserializeFromJson(json: any): Place {
    this.id = _.get(json, 'id', 0);
    this.name = _.get(json, 'name', '');
    this.websiteUrl = _.get(json, 'website_url', '');
    this.contactNumber = _.get(json, 'contact_number', '');
    this.locationAddress = _.get(json, 'location_address', '');
    this.description = _.get(json, 'description', '');
    this.image = _.get(json, 'image', '');
    this.lat = _.get(json, 'lat', '0.0000000');
    this.long = _.get(json, 'long', '0.0000000');
    this.isFeatured = _.get(json, 'is_featured', false);
    let districts = _.get(json, 'districts', []);
    let categories = _.get(json, 'categories', []);
    let tags = _.get(json, 'tags', []);
    this.districts = districts.map(d => new District(d));
    this.categories = categories.map(t => new Category(t));
    this.tags = tags.map(t => new Tag(t));



    return this;
  }
}
