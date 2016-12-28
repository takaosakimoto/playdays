import { Pipe } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'value' })
export class ValuePipe {
  transform(obj: any, args?: any[]) {
    if (obj && args) {
      // TODO validation on format
      return args.reduce((tmpObj, key) => _.get(tmpObj, key), obj);
    }
    return obj;
  }
}
