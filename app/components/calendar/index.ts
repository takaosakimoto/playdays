import { Component, Input, Output, EventEmitter, Self } from '@angular/core';
import { NgModel } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { ICalendarEvent } from '../../interfaces';
import { MonthViewCalendarComponent } from './month-view';
import * as _ from 'lodash';
import * as moment from 'moment';

const DAYSC: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalendarArrayItem {
  place: number,
  month: number
}

@Component({
  selector: 'calendar[ngModel][calendarEvents]',
  templateUrl: 'build/components/calendar/index.html',
  directives: [MonthViewCalendarComponent],
})
export class CalendarComponent {
  public cd: NgModel;

  @Input() public calendarEvents:Array<ICalendarEvent>;
  @Input() public startFrom:Date;

  @Output() public dateClick:EventEmitter<Date> = new EventEmitter<Date>();


  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  public constructor(@Self() cd:NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
  }
  public thisMonth:Date;

  private _selectedDate:Date;
  private get selectedDate():Date {
    return this._selectedDate;
  }
  private set selectedDate(v:Date) {
    if (v) {

      if (!this._selectedDate ||
        this._selectedDate.getMonth() !== v.getMonth() ||
        this._selectedDate.getFullYear() !== v.getFullYear()
      ) {
        this.thisMonth = new Date(v.getTime());
        this.thisMonth.setDate(1);
        this.displayDateText = moment(this.thisMonth).format('MMMM YYYY');
      }

      this._selectedDate = v;

      this.cd.viewToModelUpdate(this.selectedDate);
    }
  }



  public get DAYSC() {return DAYSC};
  public cubeLength = 5;

  public monthBuffer:number;
  public displayDateText:String = moment(new Date).format('MMMM YYYY');

  ngOnInit(): void {
    console.debug('CalendarComponent OnInit');

    this.startFrom = this.startFrom || new Date(0);
  }

  public onDateClick(date:Date) {
    this.dateClick.emit(date);
  }

  public prevMonth() {
    this.setMonth(-1);
  }
  public nextMonth() {
    this.setMonth(1);
  }

  public setMonth(offset:number) {
    let year = this.thisMonth.getFullYear();
    let month = this.thisMonth.getMonth();

    this.thisMonth.setMonth(month + offset);
    this.displayDateText = moment(this.thisMonth).format('MMMM YYYY');

    this.monthBuffer = (new Date(year, month + (offset * 3), 1)).getTime();
  }



  public writeValue(v:any):void {
    if (this.selectedDate && v && v.getTime() === this.selectedDate.getTime()) {
      return;
    }
    if (v && v instanceof Date) {
      this.selectedDate = v;
      return;
    }
    this.selectedDate = v ? new Date(v) : void 0;
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }

}
