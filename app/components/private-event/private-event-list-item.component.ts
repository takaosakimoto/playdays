import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { PrivateEvent, Place } from '../../models';
import { PlaceItemComponent } from '../place/place-item.component';
import * as moment from 'moment';
@Component({
  selector: 'private-event-list-item',
  template: `
    <ion-card (click)="handlePrivateEventClicked()">
      <ion-card-header>
        {{ privateEvent.name }}
      </ion-card-header>
      <ion-card-content>
        {{ dateFormat(privateEvent.date) }} {{ timeFormate(privateEvent.from)}}
      </ion-card-content>
    </ion-card>
    <place-item
      [place]="privateEvent.place"
      (onClickPlace)="handlePlaceClicked($event)">
    </place-item>
  `,
  directives: [IONIC_DIRECTIVES, PlaceItemComponent],
})

export class PrivateEventListItemComponent {

  @Input() privateEvent: PrivateEvent;
  @Output() onClickPrivateEvent: EventEmitter<PrivateEvent> = new EventEmitter<PrivateEvent>();
  @Output() onClickPlace: EventEmitter<Place> = new EventEmitter<Place>();

  constructor() {
    //
  }

  public dateFormat(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  public timeFormate(time: Date): string {
    return moment(time).format('hh:mm A');
  }

  public handlePrivateEventClicked(): void {
    this.onClickPrivateEvent.emit(this.privateEvent);
  }

  public handlePlaceClicked(place: Place): void {
    this.onClickPlace.emit(place);
  }
}
