import { Type, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { INavItemGroup } from '../../interfaces';
import { PublicEventIndexPage } from '../public-event/index';
import { DirectoryIndexPage } from '../directory/index';
import { TrialClassIndexPage } from '../trial-class/index';
import { JoinedTrialClassIndexPage } from '../joined-trial-class/index';
import { PrivateEventIndexPage } from '../private-event/index';
import { AboutUsPage } from '../about-us/about-us';
import { NavItemGroups } from '../../components/nav-item-groups';

@Component({
  templateUrl: 'build/pages/discovery-tab/index.html',
  directives: [NavItemGroups],
})

export class DiscoveryTabIndexPage {
  public discoveryTabNavItems: [any];
  constructor(
    private _nav: NavController
  ) {
    this.discoveryTabNavItems = [
      {
        title: 'EVENTS',
        page: PublicEventIndexPage,
        bgImage: 'url(img/pages/discovery-tab/directory-index-page.png)',
      },
      {
        title: 'DIRECTORY',
        page: DirectoryIndexPage,
        bgImage: 'url(img/pages/discovery-tab/public-event-index-page.png)',
      },
      // {
      //   title: 'CLASSES (coming soon)',
      //   page: null,
      //   // page: TrialClassIndexPage,
      //   bgImage: 'url(img/pages/discovery-tab/trial-class-index-page.png)',
      // },
      // {
      //   title: 'MY TRIAL CLASSES',
      //   page: JoinedTrialClassIndexPage,
      //   bgImage: null,
      // },
      {
        title: 'JOINED PRIVATE EVENTS',
        page: PrivateEventIndexPage,
        bgImage: null,
      }
    ];

  }

  ngOnInit() {
    console.debug('DiscoveryTabIndexPage ngOnInit');
  }

  ionViewDidLeave() {
    console.debug('DiscoveryTabIndexPage ionViewDidLeave');
  }

  goToNavItemPage(navItemPage: Type) {
    if (navItemPage) this._nav.push(navItemPage);
  }

}
