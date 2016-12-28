import { Type, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { INavItemGroup } from '../../interfaces';
import { AboutUsPage } from '../about-us/about-us';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
import { NavItemGroups } from '../../components/nav-item-groups';

@Component({
  templateUrl: 'build/pages/settings/index.html',
  directives: [NavItemGroups],
})

export class SettingsIndexPage {
  public settingsNavItems: [any];
  constructor(
    private _nav: NavController
  ) {
    this.settingsNavItems = [
      // {
      //   title: 'LANGUAGE',
      //   smallText: '(Coming Soon)',
      //   page: null,
      //   bgImage: 'url(img/language_bg.png)',
      // },
      {
        title: 'ABOUT US',
        smallText: '',
        page: AboutUsPage,
        bgImage: 'url(img/about_us_bg.png)',
      },
      {
        title: 'TERMS & CONDITIONS',
        smallText: '',
        page: TermsAndConditionsPage,
        bgImage: 'url(img/terms_conditions_bg.png)',
      },
    ];

  }

  ngOnInit() {
    console.debug('SettingsIndexPage ngOnInit');
  }

  ionViewDidLeave() {
    console.debug('SettingsIndexPage ionViewDidLeave');
  }

  goToNavItemPage(navItemPage: Type) {
    if (navItemPage) this._nav.push(navItemPage);
  }

}
