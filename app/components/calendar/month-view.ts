import { Component, Input, Output, EventEmitter, Self } from '@angular/core';
import { NgModel } from '@angular/common';
import { ICalendarEvent } from '../../interfaces';
import * as _ from 'lodash';

interface DisplayDate {
  date: number;
  disabled: Boolean;
  occupied: String;
  isSelected: Boolean;
}

interface Month {
  firstDay: number,
  name: String,
  month: number,
  year: number
}

const monthName = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

@Component({
  selector: 'month-view-calendar[ngModel][calendarEvents][startOfMonth]',
  templateUrl: 'build/components/calendar/month-view.html',
})
export class MonthViewCalendarComponent {
  public cd: NgModel;

  @Input() public calendarEvents:Array<ICalendarEvent>;
  @Input() public startFrom:Date;
  @Input() public set startOfMonth(time:number) {
    this.setupMonth(new Date(time));
  };

  @Output() public dateClick:EventEmitter<Date> = new EventEmitter<Date>();

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  public constructor(@Self() cd:NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
  }

  private _selectedDate:Date;
  private get selectedDate():Date {
    return this._selectedDate;
  }
  private set selectedDate(v:Date) {
    if (v) {
      this._selectedDate = v;
      this.cd.viewToModelUpdate(this.selectedDate);
    }
  }


  // public ZERO2SIX = [0,1,2,3,4,5,6];
  public displayMonth:(DisplayDate | Boolean)[][];
  public month:Month = {firstDay: 0, name: '', month: -1, year: -1};
  public lastSelectedDate:DisplayDate;

  ngOnInit(): void {
    console.debug('CalendarMonthViewComponent OnInit');
    this.startFrom = this.startFrom || new Date(0);
  }

  ngAfterContentInit(): void {
    if (this.month.month === this.selectedDate.getMonth()) {
      this.lastSelectedDate = this.getDisplayMonthDate(this.selectedDate.getDate());
      this.lastSelectedDate.isSelected = true;
    }
  }

  public emitDateClick(date:DisplayDate) {
    if (!date || date.disabled) return;
    this.lastSelectedDate.isSelected = false;
    this.lastSelectedDate = date;
    this.lastSelectedDate.isSelected = true;

    const d = new Date(this.month.year, this.month.month, date.date);
    d.setHours(8,0,0,0);
    this.selectedDate = d;
    this.dateClick.emit(this.selectedDate);
  }

  private insertCalendarEventIntoDisplayMonth() {
    _.map(
      this.calendarEvents,
      (event:ICalendarEvent)=>{
        if (event.year === this.month.year && event.month === this.month.month) {
          this.getDisplayMonthDate(event.date).occupied =
            event.date>=this.startFrom.getDate()?'true':'passed';
        }
      }
    )
  }

  private getDisplayMonthDate(date:number):DisplayDate {
    let week:number;


    // TODO change me may be
    if ((date + this.month.firstDay) % 7 === 0) {
      week = Math.floor((date + this.month.firstDay) / 7) - 1;
    } else {
      week = Math.floor((date + this.month.firstDay) / 7);
    }

    const day = (date + this.month.firstDay - 1) % 7;
    return <DisplayDate>this.displayMonth[week][day];
  }

  private setupMonth(date:Date) {
    this.month.firstDay = date.getDay();
    this.month.name = monthName[date.getMonth()];
    this.month.month = date.getMonth();
    this.month.year = date.getFullYear();

    const offsetDay = (8 - this.month.firstDay);
    const month = date.getMonth();
    const year = date.getFullYear();
    const _lastDate = new Date(year, month+1, 0)
    const lastDate = _lastDate.getDate();
    const lastDateDay = _lastDate.getDay();
    const allDisabled = this.startFrom > _lastDate;
    const allEnable = this.startFrom < date;

    const startFromDate = this.startFrom.getDate();

    const constructDisplayDate = (d:number):DisplayDate => ({
      date: d,
      disabled: !allEnable && (allDisabled || startFromDate>d),
      occupied: 'false',
      isSelected: false
    });

    let weeks:(DisplayDate | Boolean)[][] =
      this.month.firstDay?[_.times(date.getDay(), ()=>false)]:[];

    let i = 0;
    while(++i<=lastDate){
      let d = constructDisplayDate(i);
      (i-offsetDay)%7===0?weeks.push([d]):_.last(weeks).push(d)
    }

    weeks[weeks.length-1] = _.last(weeks).concat(
      _.times(7-_.last(weeks).length, ()=>false)
    )
    this.displayMonth = weeks;
    this.insertCalendarEventIntoDisplayMonth();
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
