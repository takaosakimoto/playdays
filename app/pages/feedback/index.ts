import { Component } from '@angular/core';

@Component({
  templateUrl: 'build/pages/feedback/index.html',
})
export class FeedbackIndexPage {
  constructor(
  ) {}
  ngOnInit() {
    console.debug('FeedbackIndexPage OnInit');
  }

  ionViewDidLeave() {
    console.debug('FeedbackIndexPage ionViewDidLeave');
  }
}
