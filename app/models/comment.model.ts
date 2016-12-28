import * as _ from 'lodash';
import { ModelBase } from '../engine/model';

export class Comment extends ModelBase<Comment> {

  public id: number;
  public textContent: string;
  public fbUserId: string;
  public userName: string;
  public fbUserPictureUrl: string;
  public createdAt: Date;
  public place_id: Number;
  public event_id: Number;
  public trial_class_id: Number;
  public back_color: string;
  public font_color: string;

  deserializeFromJson(json: any): Comment {
    let back_colors=['#1480ec', '#14ec3a', '#709076', '#bd2b95', '#91bd2b'];
    this.font_color='#fff';

    this.id = _.get(json, 'id', 0);
    this.textContent = _.get(json, 'text_content', '');
    this.fbUserId = _.get(json, 'user_fb_user_id', '');
    let pos=parseInt(this.fbUserId, 10)%5;
    this.back_color=back_colors[pos];
    this.fbUserPictureUrl = `https://graph.facebook.com/v2.6/${this.fbUserId}/picture?height=100`;
    this.userName = _.get(json, 'user_fname', '')+' '+_.get(json, 'user_lname', '');
    this.createdAt = new Date(_.get(json, 'inserted_at', 0));
    this.place_id = _.get(json, 'place_id', null);
    this.event_id = _.get(json, 'event_id', null);
    this.trial_class_id = _.get(json, 'trial_class_id', null);

    return this;
  }
}
