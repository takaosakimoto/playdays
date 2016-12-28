// import {Directive, ElementRef, ViewChild} from '@angular/core';
// import {Subject} from 'rxjs/Subject';
// import { PublicEventShowPage } from '../../public-event/show';
// import {Content, App} from 'ionic-angular/index';
//
// /*
//  * WIP mashup of
//  * http://www.joshmorony.com/how-to-create-a-directive-in-ionic-2-parallax-header/
//  * and ionic2 infinite scroll techniques to access properties
//  * and http://codepen.io/kaemak/pen/mHyKa
//  * to get desired behaviour on scroll up/down
//  */
// @Directive({
//   selector: '[elastic-header]'
// })
// export class ElasticHeader {
//   @ViewChild('public-event-show-page') publicEventShowPage: PublicEventShowPage;
//   /*
//    * more to come
//    * http://codepen.io/kaemak/pen/mHyKa
//    * and here last answer shows also transparent option
//    * http://stackoverflow.com/questions/31290424/hide-fixed-header-on-scroll-down-show-on-scroll-up-and-hover-version-2-please
//    */
//
//   public scrollerHandle;
//   public header : HTMLElement;
//
//   public delta = 5;
//
//   private headerHeight;
//   private translateAmt;
//   private scaleAmt;
//   private scrollTop;
//   private lastScrollTop = 0;
//   private ticking;
//
//   private content: Content;
//
//   scrollSubject = new Subject();
//
//   constructor(public element: ElementRef, private app: App) {
//     console.log('initializing ElasticHeader');
//     this.element = element;
//
//     this.scrollSubject.debounceTime(200).subscribe(() => {
//       this.hasScrolled();
//     });
//   }
//
//   ngAfterViewInit() {
//     console.debug('ElasticHeader OnInit');
//     this.content = this.publicEventShowPage;
//     console.log('got page content', this.content);
//   }
//
//   ngOnInit() {
//     var me = this;
//     console.log('ngoninit ElasticHeader', arguments);
//     this.scrollerHandle = this.element.nativeElement.children[0];
//     this.header = document.getElementById("elastic-header");
//     this.headerHeight = this.scrollerHandle.clientHeight;
//     this.translateAmt = null;
//     this.scaleAmt = null;
//     this.scrollTop = null;
//     this.lastScrollTop = null;
//     this.ticking = false;
//
//     this.header.style.webkitTransformOrigin = 'center bottom';
//
//     window.addEventListener('resize', () => {
//       this.headerHeight = this.scrollerHandle.clientHeight;
//     }, false);
//
//     this.scrollerHandle.addEventListener('scroll', () => {
//       this.scrollSubject.next({});
//       // if(!me.ticking){
//       //   window.requestAnimationFrame(() => {
//       //     me.updateElasticHeader();
//       //   });
//       // }
//       // this.ticking = true;
//     });
//
//   }
//
//   updateElasticHeader() {
//     console.log('updating ElasticHeader');
//
//     this.scrollTop = this.scrollerHandle.scrollTop;
//
//     if (this.scrollTop >= 0) {
//       this.translateAmt = this.scrollTop / 2;
//       this.scaleAmt = 1;
//     } else {
//       this.translateAmt = 0;
//       this.scaleAmt = -this.scrollTop / this.headerHeight + 1;
//     }
//
//     this.header.style.webkitTransform = 'translate3d(0,'+this.translateAmt+'px,0) scale('+this.scaleAmt+','+this.scaleAmt+')';
//
//     this.ticking = false;
//   }
//
//   hasScrolled() {
//     this.scrollTop = this.content.getContentDimensions().scrollTop;
//     console.log('called hasScrolled ElasticHeader', this.scrollTop);
//     // Make sure they scroll more than delta
//     if(Math.abs(this.lastScrollTop - this.scrollTop) <= this.delta)
//       return;
//
//     console.log('hasScrolled delta', Math.abs(this.lastScrollTop - this.scrollTop));
//
//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (this.scrollTop > this.lastScrollTop) { // && this.scrollTop > this.header.clientHeight) {
//       // Scroll Down
//       this.header.classList.remove('nav-down');
//       this.header.classList.add('nav-up');
//     } else {
//       // Scroll Up
//       // if(this.scrollTop + (<Window>window).innerHeight < window.document.documentElement.clientHeight) {
//         this.header.classList.remove('nav-up');
//         this.header.classList.add('nav-down');
//       // }
//     }
//
//     this.lastScrollTop = this.scrollTop;
//   }
//
// }
