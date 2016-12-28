import { Component, Self, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { NgModel } from '@angular/common';
import { Slides } from 'ionic-angular/index';
import * as moment from 'moment';
import * as _ from 'lodash';

const DAYSN: Array<number> = _.range(7);
const DAYSC: Array<string> = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function new_offset_date(oldDate: Date, offset: number) {
  let new_date = new Date(oldDate.getTime());
  new_date.setDate(new_date.getDate() + offset);
  return new_date;
}

function dateEqual(a:Date, b:Date):Boolean {
  return a && b && (a.getDate() === b.getDate()) &&
    (a.getMonth() === b.getMonth()) &&
    (a.getFullYear() === b.getFullYear())
}

@Pipe({name: 'dayString'})
export class DayString implements PipeTransform {
  transform(date: Date, offset: string): String {
    return moment(date).add(offset, 'days').format('ddd D, MMMM YYYY');
  }
}

@Pipe({name: 'getDateByWeekAndDay'})
export class GetDateByWeekAndDay implements PipeTransform {
  transform(date: Date, day: number): number {
    return new_offset_date(date, day).getDate();
  }
}

@Component({
  selector: 'week-view-calendar[ngModel]',
  templateUrl: 'build/components/week-view-calendar/index.html',
  pipes: [DayString, GetDateByWeekAndDay]
})
export class WeekViewCalendarComponent {
  @ViewChild(Slides) private slider: Slides;
  public slideCacheNumber: number = 3;

  public cd: NgModel;

  private get DAYSN() {return DAYSN};
  private get DAYSC() {return DAYSC};

  private _sliderOptions: Object = {
    initialSlide: this.slideCacheNumber,
    observer: true,
    autoHeight: true,
    speed: 100,
    onTransitionEnd: this.onSlideWillChanged.bind(this),
    pager: false // very useful when debugging
  };
  private get sliderOptions() {return this._sliderOptions};

  private slidesStartDays: Array<Date> = [];
  private _slideIniting: Boolean = true;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  public constructor(@Self() cd:NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
  }

  private _selected:Date;
  private get selected():Date {
    return this._selected;
  }
  private set selected(v:Date) {
    if (dateEqual(this.selected, v)) return;
    this._selected = v;
    this._dayOffset = this._selected.getDay();
    this.cd.viewToModelUpdate(v);
  }

  private get selectedDate():Date {
    return new_offset_date(
      this.slidesStartDays[this.slideCacheNumber], Number(this.dayOffset)
    );
  }

  private _dayOffset: number;
  private get dayOffset():number {
    return this._dayOffset;
  }
  private set dayOffset(v:number) {
    if (v !== this._dayOffset) {
      this._dayOffset = v;
      this.selected = this.selectedDate;
    }
  }

  ngOnInit(): void {
    console.debug('WeekViewCalendarComponent OnInit');
  }

  ngAfterContentInit(): void {
    this._setupSlides();
  }

  public onSlideWillChanged(slide: any): void {
    if (this._slideIniting) {
      this._slideIniting = false;
      return
    }


    const backward = slide.swipeDirection === 'prev';
    let newIndex = this.slider.getActiveIndex();

    if (backward) {
      while (newIndex < this.slideCacheNumber) {
        newIndex++;
        this.slidesStartDays.unshift(
          new_offset_date(
            _.first(this.slidesStartDays),
            -7
          )
        );
        this.slidesStartDays.pop();
      }
    } else {
      while (newIndex > this.slideCacheNumber) {
        newIndex--;
        this.slidesStartDays.push(
          new_offset_date(
            _.last(this.slidesStartDays),
            7
          )
        );
        this.slidesStartDays.shift();
      }
    }

    this.slider.slideTo(this.slideCacheNumber, 0, false);
    this.selected = this.selectedDate;
  }

  private getDateByWeekAndDay(week: number, day: number): number {
    return new_offset_date(this.slidesStartDays[week], day).getDate();
  }

  private slidesDayString(week: number): string {
    return moment(this.slidesStartDays[week])
      .add(Number(this.dayOffset), 'days')
      .format('dddd MMM D,YYYY');
  }

  private _setupSlides(): void {
    let d = this.selected ? new Date(this.selected.getTime()) : new Date;
    d.setHours(8, 0, 0, 0);
    let day = d.getDay();
    d.setDate(d.getDate() - day);

    const n = this.slideCacheNumber;
    if (d === this.slidesStartDays[n]) return;

    this.slidesStartDays = _.map(
      _.range(0-n, n+1),
      (weekOffset: number) => new_offset_date(d, weekOffset * 7)
    );

    this.dayOffset = day;
  }

  public writeValue(v:any):void {
    if (!v) return;
    if (dateEqual(this.selected, v)) {
      return;
    }
    if (v && v instanceof Date) {
      this.selected = v;
      this._setupSlides();
      return;
    }
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }

}
