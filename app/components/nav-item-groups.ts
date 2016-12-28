import { Type } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Button, List, ListHeader, Item, Label, NavController } from 'ionic-angular/index';
import { INavItemGroup } from '../interfaces';

@Component({
  selector: 'nav-item-groups',
  template: `
  <ion-list>
    <ion-item-group
      *ngFor="let navGroup of navGroups">
      <ion-list-header
        *ngIf="navGroup.hasHeader"
        light>
        {{navGroup.header}}
      </ion-list-header>
      <button
        class="nav-item-group-btn"
        [ngStyle]="{'background-image': item.bgImage, 'border-left': item.borderColor}"
        ion-item
        *ngFor="let item of navGroup.listItems"
        (click)="goToNavItemPage(item.page)">
        <ion-label class="nav-item-group-btn-title">
          {{item.title}}<br>
          <span class="nav-item-group-btn-subtitle">{{item.smallText}}</span>
        </ion-label>
        <ion-badge item-right *ngIf="item.badge && item.badge > 0">{{ item.badge }}</ion-badge>
      </button>
    </ion-item-group>
  </ion-list>
  `,
  directives: [Button, List, ListHeader, Item, Label]
})

export class NavItemGroups {
  @Input() navGroups: [INavItemGroup];
  constructor(
    private _nav: NavController
  ) {
  }

  goToNavItemPage(navItemPage: Type) {
    this._nav.push(navItemPage);
  }
}
