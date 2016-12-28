import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { IONIC_DIRECTIVES } from 'ionic-angular/index';
import { Place } from '../../models';

@Component({
  selector: 'place-item',
  template: `
    <ion-card (click)="handlePlaceClicked()">
      <ion-item class="place-card-container">
        <ion-thumbnail class="place-card-thumbnail" item-left>
          <img [src]="place.image">
        </ion-thumbnail>
        <div class="place-card-details">
          <h2 class="place-item-name">
            {{place.name}}
          </h2>
          <div class="place-item-location">
            <ion-icon class="place-item-icon" name="pin">
            </ion-icon>
            <span class="place-item-address" [innerHTML]="place.locationAddress"></span>
          </div>
        </div>
      </ion-item>
    </ion-card>
  `,
  directives: [IONIC_DIRECTIVES],
})

export class PlaceItemComponent {

  @Input() place: Place;
  @Output() onClickPlace: EventEmitter<Place> = new EventEmitter<Place>();

  constructor() {
    //
  }

  public handlePlaceClicked(): void {
    this.onClickPlace.emit(this.place);
  }
}
