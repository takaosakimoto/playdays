import { Type, provide, ViewChild, Component } from '@angular/core';
import { Http } from '@angular/http';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, Push, Device } from 'ionic-native';
import { Subscription } from 'rxjs/Rx';
import { AppConfig } from './app.config';
import { EndpointOptions } from './engine/endpoint';
import { SplashPage } from './pages/splash/splash';

import {
  ApiClient,
  ApiClientOptions,
  DefaultApiClientOptions,
  SocketClient,
  SocketClientOptions
} from './utils';

import {
  ConfigApiClientOptions,
  ConfigSocketClientOptions,
  ExtendEndpointOptions
} from './configs';

import { IUpdateDeviceRequest } from './interfaces';
import { ENDPOINT_PROVIDERS } from './endpoints';
import { MeStore, STORE_PROVIDERS } from './stores';
import { UpdateDeviceAction } from './actions';
import { CHANNEL_PROVIDERS } from './channels';
import { FBClient } from './utils';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
})
export class PlaydaysApp {
  @ViewChild(Nav) nav;

  private rootPage: Type;
  private _meLoggedInSubscription: Subscription;
  private _push;

  constructor(
    private _platform: Platform,
    private _socketClient: SocketClient,
    private _meStore: MeStore,
    private _updateDeviceAction: UpdateDeviceAction
  ) {
    this.rootPage = SplashPage;
    this.initializeApp();
  }

  ngAfterViewInit() {
    this._meLoggedInSubscription = this._setupMeLoggedInSubscription();
  }

  private initializeApp(): void {
    this._platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this._platform.is('ios')) {
        StatusBar.overlaysWebView(false);
      }
      StatusBar.backgroundColorByHexString('6ED3FF');
      // Keyboard.disableScroll(true);
      this._socketClient.connect();
    });
  }

  private _setupMeLoggedInSubscription(): Subscription {
    return this._meStore.loggedIn$.subscribe(
      (hasLoggedIn: boolean) => {
        if (hasLoggedIn) {
          if (!this._push) {
            this._platform.ready().then(() => {
              this._push = this._initPushNotification();
            });
          }
        }
      }
    );
  }

  private _initPushNotification() {
    const APP_CONFIG = process.env['APP_CONFIG'];

    let push = Push.init({
       android: {
         senderID: APP_CONFIG.androidGCMSenderId
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {}
    });

    push.on('registration', (data) => {
      console.log('registration');
      let request: IUpdateDeviceRequest = {
        uuid: Device.device.uuid,
        params: {
          device_token: data.registrationId,
          platform: Device.device.platform,
        }
      };

      this._updateDeviceAction.execute(request);
    });

    push.on('notification', (data) => {
      console.log(data.message);
      console.log(data.title);
      console.log(data.count);
      console.log(data.sound);
      console.log(data.image);
      console.log(data.additionalData);
      console.log(this.nav);
      // if (!data.additionalData.foreground) {
      //   //
      //   let type = data.additionalData['type'];
      //   console.log(type);
      //   switch (type) {
      //     case 'chatroom':
      //
      //       break;
      //     default:
      //       console.debug('unhandle type', type);
      //       break;
      //   }
      // }
    });

    push.on('error', (e) => {
      console.log(e.message);
    });

    return push;
  }

}


ionicBootstrap(
  PlaydaysApp,
  // providers:
  [
    DefaultApiClientOptions,
    ConfigApiClientOptions,
    provide(ApiClient, {
      useFactory: (http: Http, options: ApiClientOptions) => new ApiClient(http, options),
      deps: [Http, ConfigApiClientOptions]
    }),

    // websocket client
    SocketClient,
    provide(SocketClientOptions, { useClass: ConfigSocketClientOptions }),

    // REST endpoints
    ...ENDPOINT_PROVIDERS,
    provide(EndpointOptions, { useClass: ExtendEndpointOptions }),

    // websocket endpoints
    ...CHANNEL_PROVIDERS,

    // state management
    ...STORE_PROVIDERS,

    FBClient,
    AppConfig,
    UpdateDeviceAction,
  ],
  // config:
  {
    tabbarPlacement: 'bottom',
    backButtonText: '',
    backButtonIcon: 'md-arrow-back',
    platforms: {
      android: {
        pageTransitionDelay: 0 // No More Page Transition Delays
      },
      ios: {
        pageTransitionDelay: 0,
        tabSubPages: true // Allows for navigation through Tab Pages
      }
    }
  }
);
