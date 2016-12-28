import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { PhotoViewer } from 'ionic-native';
import { Platform } from 'ionic-angular/index';
// import { ElasticHeader } from '../../directives/elastic-header.directive';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';

interface Param {
  item: Item
}

interface Item {
  image : String;
}

@Component({
  selector: 'hero-image',
  template: `
    <div
      class="show-detail-image"
      [style.background-image]="'url(' + model.item.image + ')'"
      (click)="viewFullScreenImage(model.item.image)"
      tappable>
      <ion-row class="hero-image-header-container">
        <ion-col>
          <h6 class="hero-image-content-header">
             {{model.item.name}}
          </h6>
        </ion-col>
      </ion-row>
    </div>
  `,
  directives: [ ProtectedDirective ]
})
export class HeroImageComponent {
  @Input() public model:Param;
  public PhotoViewer: any;

  constructor(
    private _platform: Platform
  ) {
  }

  viewFullScreenImage(image: string, title?: string): void {
    console.log('View Image in Fullscreen clicked');
    this._platform.ready()
      .then(() => {
        if (PhotoViewer)
          PhotoViewer.show(image, title);
      })
    console.log('Image', image);
  }

  ngOnInit(): void {
    console.debug('HeroImageComponent OnInit');
  }

  ngAfterViewInit():void {

  }
}
