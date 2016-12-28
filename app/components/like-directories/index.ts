import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProtectedDirective } from '../../directives/protected.directive';
import { Platform } from 'ionic-angular/index';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
// import {ElasticHeader} from '../../directives/elastic-header.directive';
import * as moment from 'moment';
import { Place } from '../../models';

@Component({
  selector: 'like-directories',
  templateUrl: 'build/components/like-directories/index.html',
  directives: [ProtectedDirective]
})
export class LikeDirectoriesComponent {
  @Input() public places:Array<Place>;
  //@Output() public joinOnClick = new EventEmitter<Param>();
  @Output() public gotoDetails = new EventEmitter<Place>();

  constructor(
    private _nav: NavController,
    private _platform: Platform,
    private _sanitationService: DomSanitizationService
  ) {
  }

  public mapHref: SafeResourceUrl = '';

  ngOnInit(): void {
    console.debug('ShowDetailComponent OnInit');
    console.log('like_detail List');
    console.log(this.places);
  }

  ngAfterViewInit():void {
  }

  gotoDetail(p: Place){
    this.gotoDetails.emit(p);
  }

}
