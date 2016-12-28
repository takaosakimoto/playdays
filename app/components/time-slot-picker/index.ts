import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimeSlot, Session } from '../../models';
// import { find, remove } from 'lodash';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SessionStore } from '../../stores';

const sanitize = /\W/g;

interface Param {
  item: Item
  timeSlotId: Number;
}

interface Item {
  id: Number;
  name: String;
  websiteUrl: String;
  contactNumber: String;
  locationAddress: String;
  description: String;
  image : String;
  priceRange?: {hi: Number, lo: Number};
  timeSlots: Array<TimeSlot>;
}

interface outBound {
  itemId:Number;
  timeSlotId:Number
}

@Component({
  selector: 'time-slot-picker',
  templateUrl: 'build/components/time-slot-picker/index.html',
})
export class TimeSlotPickerComponent {
  @Input() public model:Param;
  @Input() public modelName:String;
  @Output() public confirmOnClick:EventEmitter<outBound> = new EventEmitter<outBound>();
  @Output() public shareOnClick = new EventEmitter();

  public timeSlots:Array<TimeSlot> = [];
  // public confirmed:Boolean = false;
  // public timeSlotPickerListHeight:String = '0em';
  // public confirmButtonText:String = "Confirm";

  public noAvableTimeSlot: Boolean = false;
  // public selectedTimeSlotIndex:Number;
  // private _selectedTimeSlotId:Number;
  // private get selectedTimeSlotId():String {
  //   return String(this._selectedTimeSlotId);
  // }
  // private set selectedTimeSlotId(v:String) {
  //   // this._selectedTimeSlotId = Number(v);
  // }

  constructor(
    private _SessionStore: SessionStore
  ) {
  }

  ngOnInit(): void {
    console.debug('TimeSlotPickerComponent OnInit');
    // this._selectedTimeSlotId = this.model.timeSlotId;
    this._setupSessions();
    let numberOfTimeSlots = this.model.item.timeSlots.length;
    // this.timeSlotPickerListHeight = String(
    //   numberOfTimeSlots * 6 +
    //   (numberOfTimeSlots > 1 ? 2 : 1) * 3.3
    // ) + 'em';
  }

  // public itemTop(timeSlotId:number, index:number):string {
  //   if (this._selectedTimeSlotId === timeSlotId) return '3.3em';
  //   const pastTimeSlot = this.selectedTimeSlotIndex === -1;
  //   return String(
  //     (
  //       pastTimeSlot
  //         ? 3.3 // first header
  //         : 7.6 + 6 // two headers and first item
  //     ) +
  //     (index * 6) +
  //     (
  //       (!pastTimeSlot && this.selectedTimeSlotIndex < index) ? -6 : 0
  //     )
  //   ) + 'em';
  // }

  // public buttonClass(timeSlot:TimeSlot):String {
  //   return 'join-time-slot-confirm-btn ' +
  //     (this.confirmed && this._selectedTimeSlotId === timeSlot.id ? 'confirmed ' : ' ') +
  //     'btn-' + timeSlot['confirmButtonText'].toLowerCase().replace(sanitize, '_');
  // }

  // private setSelectedTimeSlotId(id:Number, index:Number):void {
  //   this._selectedTimeSlotId = id;
  //   this.selectedTimeSlotIndex = index;
  // }

  private timeSlotDate(timeSlot:TimeSlot): string {
    return moment(timeSlot.date).format('Do MMMM[,] dddd');
  }

  private timeSlotTime(timeSlot:TimeSlot): string {
    return moment(timeSlot.from).format('LT') + ' - ' + moment(timeSlot.to).format('LT');
  }

  private _setupSessions() {
    this._SessionStore.sessions$.subscribe(
      (sessions: Array<Session>) => {
        let sessionIndexIdMap = _.map(sessions, 'timeSlot.id');

        let today = (new Date);
        today.setHours(7,59,59,0);

        this.timeSlots =
          _(this.model.item.timeSlots)
          // .filter(timeSlot=>(timeSlot.date > today))
          // .map(
          //   timeSlot => _.merge(
          //     timeSlot,
          //     {confirmButtonText: _.get(
          //       sessions,
          //       [sessionIndexIdMap.indexOf(timeSlot.id), 'status'],
          //       'GOING'
          //     ).toUpperCase()}
          //   )
          // )
          .sortBy('id')
          .value()
        //
        // this.selectedTimeSlotIndex = _.findIndex(this.timeSlots, ['id', this._selectedTimeSlotId]);
        this.noAvableTimeSlot = this.timeSlots.length === 0;
      }
    );
  }

  // emitConfirm():void {
  //   this.confirmed = true;
  //   setTimeout( ()=>{
  //     _.find(this.timeSlots, ['id', this._selectedTimeSlotId])['confirmButtonText']="I’M GOING";
  //   }, 199 );
  //   this.confirmOnClick.emit({itemId: this.model.item.id, timeSlotId: this._selectedTimeSlotId});
  // }

  emitShare(ev):void {
    this.shareOnClick.emit(ev);
  }

}
