export interface IUpdateRequest {
  token: string;
  id: Number;
  fname: string;
  lname: string;
  email: string;
  region_id?: Number;
  district_id?: Number;
  about_me?: string;
  languages?: Array<String>;
  mobile_phone_number?: String;
  children?: Array<{birthday: string}>;
  like_places?: Array<Number>;
  like_events?: Array<Number>;
  password: any;
}
