import { Component } from '@angular/core';
import { SocialSharing } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/coming-soon/index.html',
})
export class ComingSoonIndexPage {
  public comingSoonNavItems: [any];
  constructor(
  ) {}

  votedLanguage() {
    window.plugins.socialsharing.shareViaEmail('I Vote for Bilingual!', 'Bilingual Requested', ['getintouch@playdays.co'], null, null);
  }

  votedChatSystem() {
    window.plugins.socialsharing.shareViaEmail('I Vote for a Chat System!', 'Chat System Requested', ['getintouch@playdays.co'], null, null);
  }

  votedPrivateEvents() {
    window.plugins.socialsharing.shareViaEmail('I Vote for Private Events!', 'Private Events Requested', ['getintouch@playdays.co'], null, null);
  }

  votedReminders() {
    window.plugins.socialsharing.shareViaEmail('I Vote for Reminders!', 'Reminders Requested', ['getintouch@playdays.co'], null, null);
  }

  votedTrialClasses() {
    window.plugins.socialsharing.shareViaEmail('I Vote for Trial Classes!', 'Trial Classes Requested', ['getintouch@playdays.co'], null, null);
  }

  votedMoreVisuals() {
    window.plugins.socialsharing.shareViaEmail('I Vote for more visuals!', 'More Visuals Requested', ['getintouch@playdays.co'], null, null);
  }

  ngOnInit() {
    console.debug('ComingSoonIndexPage OnInit');
  }

  ionViewDidLeave() {
    console.debug('ComingSoonIndexPage ionViewDidLeave');
  }
}
