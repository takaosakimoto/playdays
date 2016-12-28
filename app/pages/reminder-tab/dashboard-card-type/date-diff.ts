import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const DATEMAP = {
  sameDay: '[today -] Do MMMM',
  nextDay: '[tomorrow -] Do MMMM',
  nextWeek: 'dddd [-] Do MMMM',
  lastDay: '[yesterday -] Do MMMM',
  lastWeek: '[last] dddd [-] Do MMMM',
  sameElse: 'DD/MM/YYYY'
}


@Pipe({name: 'dateDiff'})
export class DateDiff implements PipeTransform {
  transform(at: Date, createdAt: Date): String {
    return moment(at).calendar(moment(createdAt), DATEMAP);
  }
}
