import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { Platform } from 'ionic-angular/index';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
// import {ElasticHeader} from '../../directives/elastic-header.directive';
import * as moment from 'moment';
import { PublicEvent } from '../../models';

@Component({
  selector: 'like-events',
  templateUrl: 'build/components/like-events/index.html',
  directives: [ProtectedDirective]
})
export class LikeEventsComponent {
  @Input() public events:Array<PublicEvent>;
  @Output() public gotoDetails = new EventEmitter<PublicEvent>();

  constructor(
    private _platform: Platform,
    private _sanitationService: DomSanitizationService
  ) {
  }

  public mapHref: SafeResourceUrl = '';

  ngOnInit(): void {
    console.debug('ShowDetailComponent OnInit');
    console.log('like_detail List');
    console.log(this.events);
  }

  ngAfterViewInit():void {
  }

  gotoDetail(e: PublicEvent){
    console.log(e);
    this.gotoDetails.emit(e);
  }

}
