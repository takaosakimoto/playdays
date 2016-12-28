import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { TimeSlot } from '../../models';
import { WeekViewCalendar } from '../index';
import { EventTagStore } from '../../stores';
import * as moment from 'moment';
import * as _ from 'lodash';

interface TimeSlotAble {
  name: String;
  locationAddress: String;
  image: String;
  timeSlots: Array<TimeSlot>;
}

interface ItemClickEvent {
  item: TimeSlotAble;
  timeSlotId: number;
}

@Component({
  selector: 'time-slot-list',
  templateUrl: 'build/components/time-slot-list/index.html',
  directives: [WeekViewCalendar, ProtectedDirective]
})
export class TimeSlotListComponent {
  @Input() public timeSlotAble: Array<TimeSlotAble>;
  @Output() public cardOnClick: EventEmitter<ItemClickEvent> = new EventEmitter<ItemClickEvent>();
  @Output() public buttonOnClick: EventEmitter<ItemClickEvent> = new EventEmitter<ItemClickEvent>();

  public selectedDate;
  public timeSlotsGroup: {[index: number]: Array<TimeSlot>}|{} = {};

  ngOnInit(): void {
    console.debug('TimeSlotListComponent OnInit');
    this.selectedDate = new Date;
    this.selectedDate.setHours(8,0,0,0);
    this.timeSlotsGroup = this._groupByDate(this.timeSlotAble);
  }

  // ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     let cur  = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  //   }
  // }
  private plainAddress(address: string): string {
    return  address ? String(address).replace(/<[^>]+>/gm, '').replace(/&nbsp;/g, '') : '';
  }

  private dateFormat(date: Date): string {
    return moment(date).format('Do MMMM[,] dddd');
  }

  private timeFormat(from: Date, to: Date): string {
    return moment(from).format('LT') + ' - ' + moment(to).format('LT');
  }

  private _groupByDate(
    timeSlotAbles: Array<TimeSlotAble>
  ): {[index: number]: Array<TimeSlot>}|{} {
    return _(timeSlotAbles)
      .map(
        (timeSlotAble: TimeSlotAble, index: number) => _.map(
          timeSlotAble.timeSlots,
          timeSlot => _.merge({}, timeSlot, {timeSlotAbleIndex: index}) // after map, typescript lost type
        )
      )
      .flatten()
      .tap(x => console.log('fucl', x))
      .map(ts => new TimeSlot(ts))
      // .tap(x => console.log('yoooo', x))
      .sortBy('from')
      .groupBy(_.method('date.getTime'))
      .value();
  }

  private emitCardOnClick(item, id) {
    this.cardOnClick.emit({item: item, timeSlotId: id});
  }
  private emitButtonOnClick(item, id) {
    this.buttonOnClick.emit({item: item, timeSlotId: id});
  }

}
