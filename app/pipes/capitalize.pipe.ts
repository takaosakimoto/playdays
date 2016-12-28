'use strict';
import { Pipe, PipeTransform } from '@angular/core';
import { isString, isBlank } from '@angular/core/src/facade/lang';
import { InvalidPipeArgumentException } from '@angular/common/src/pipes/invalid_pipe_argument_exception';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  supports(text: any): boolean {
    return isString(text);
  }

  transform(value: string, args: Array<any> = []): string {
    if (isBlank(value)) return value;

    if (!this.supports(value)) {
      throw new InvalidPipeArgumentException(CapitalizePipe, value);
    }

    if (args[0] !== undefined && args[0].toLowerCase() === 'all') {
      return this.capitalizeAllWords(value);
    }

    return this.capitalizeWord(value);
  }

  capitalizeWord(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  capitalizeAllWords(text: string): string {
    var words = text.split(' ');
    var transformedValue: string = '';

    for (var i = 0; i < words.length; i++ ) {
      if (i !== 0) {
        transformedValue += ' ' + this.capitalizeWord(words[i]);
        continue;
      }

      transformedValue += this.capitalizeWord(words[i]);
    }

    return transformedValue;
  }

}
