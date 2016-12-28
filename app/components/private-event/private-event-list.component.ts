import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { PrivateEvent, Place } from '../../models';
import { PrivateEventListItemComponent } from './private-event-list-item.component';

@Component({
  selector: 'private-event-list',
  template: `
    <ion-list>
      <div *ngFor="let privateEvent of privateEvents">
        <private-event-list-item
          [privateEvent]="privateEvent"
          (onClickPrivateEvent)="handlePrivateEventClicked($event)"
          (onClickPlace)="handlePlaceClicked($event)">
        </private-event-list-item>
      </div>
    </ion-list>
  `,
  directives: [IONIC_DIRECTIVES, PrivateEventListItemComponent],
})

export class PrivateEventListComponent {

  @Input() privateEvents: Array<PrivateEvent>;
  @Output() onClickPrivateEvent: EventEmitter<PrivateEvent> = new EventEmitter<PrivateEvent>();
  @Output() onClickPlace: EventEmitter<Place> = new EventEmitter<Place>();

  constructor() {
    //
  }

  public handlePrivateEventClicked(privateEvent: PrivateEvent): void {
    this.onClickPrivateEvent.emit(privateEvent);
  }

  public handlePlaceClicked(place: Place): void {
    this.onClickPlace.emit(place);
  }
}
