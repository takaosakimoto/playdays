import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Region } from '../models';
import { Accordion, AccordionGroup } from './accordion/accordion.component';
import * as _ from 'lodash';

// @Component({
//   selector: 'region-district-checkbox-list',
//   template: `
//     <ion-list>
//       <div *ngFor="let _region of _regions">
//         <ion-list-header>
//           {{_region.name}}
//         </ion-list-header>
//         <ion-item *ngFor="let _district of _region.districts">
//           <ion-label>{{_district.name}}</ion-label>
//           <ion-checkbox
//             [checked]="_selectedDistrictIds.indexOf(_district.id) >= 0"
//             (ionChange)="handlerCheckboxChange($event, _district.id)">
//           </ion-checkbox>
//         </ion-item>
//       </div>
//     </ion-list>
//   `,
//   directives: [IONIC_DIRECTIVES, Accordion, AccordionGroup],
// })

@Component({
  selector: 'region-district-checkbox-list',
  template: `
    <accordion>
      <accordion-group class="region-district-accordion-group" *ngFor="let _region of _regions" [heading]="_region.name">
        <ion-list [style.margin-bottom]="0">
          <div class="region-district-accordion-item">
            <ion-item class="region-district-accordion-subitem" *ngFor="let _district of _region.districts">
              <ion-label>{{_district.name}}</ion-label>
              <ion-checkbox
                [checked]="_selectedDistrictIds.indexOf(_district.id) >= 0"
                (ionChange)="handlerCheckboxChange($event, _district.id)">
              </ion-checkbox>
            </ion-item>
          </div>
        </ion-list>
      </accordion-group>
    </accordion>
  `,
  directives: [IONIC_DIRECTIVES, Accordion, AccordionGroup],
})

export class RegionDistrictCheckBoxListComponent {

  @Output() change: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();

  private _regions: Array<Region>;
  private _selectedDistrictIds: Array<number> = [];

  constructor() {
    //
  }

  @Input()
  set regions(regions:  Array<Region>) {
    this._regions = regions;
  }

  @Input()
  set selectedDistrictIds(ids: Array<number>) {
    this._selectedDistrictIds = ids;
  }

  public handlerCheckboxChange(event, id): void {
    let arr = this._selectedDistrictIds;
    if (event._checked) {
      arr.push(id);
    } else {
      _.pull(arr, id);
    }
    this._selectedDistrictIds = arr;
    this.change.emit(arr);
  }
}
