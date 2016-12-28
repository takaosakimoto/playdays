import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  async,
  it,
} from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { provide } from '@angular/core';
import {
  BaseRequestOptions,
  // Response,
  // ResponseOptions,
  Http
} from '@angular/http';
import {
  MockBackend,
  // MockConnection
} from '@angular/http/testing';
import {
  IonicApp,
  Platform,
  NavController,
  NavParams,
  Config
} from 'ionic-angular';
import { EndpointOptions } from '../../engine/endpoint';
import { DefaultApiClientOptions, ApiClient, ApiClientOptions,  } from '../../utils';
import {
  ConfigApiClientOptions,
  ExtendEndpointOptions
} from '../../configs';
import {
  ENDPOINT_PROVIDERS,
} from '../../endpoints';

import {
  STORE_PROVIDERS
} from '../../stores';
import { FBClient } from '../../utils';
import { AppConfig } from '../../app.config';
import { SplashPage } from './splash';

class MockClass {
  public get(): any {
    return {};
  }

  public setRoot(): boolean {
    return true;
  }

  public is(): boolean {
    return true;
  }
};

class MockPlatform extends Platform {
  constructor() {
    super();
  }
}

export function main(): void {

  describe('SplashPage', () => {
    let splashPageFixture: ComponentFixture<SplashPage>;
    let splashPage: SplashPage;

    beforeEachProviders(() => [
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      }),
      DefaultApiClientOptions,
      ConfigApiClientOptions,
      provide(ApiClient, {
        useFactory: (http: Http, options: ApiClientOptions) => new ApiClient(http, options),
        deps: [Http, ConfigApiClientOptions]
      }),
      provide(EndpointOptions, { useClass: ExtendEndpointOptions }),
      ...ENDPOINT_PROVIDERS,
      ...STORE_PROVIDERS,
      MockPlatform,
      provide(FBClient, {
        useFactory: (platform: MockPlatform) => new FBClient(platform),
        deps: [MockPlatform]
      }),
      AppConfig,
      provide(NavController, { useClass: MockClass }),
      provide(NavParams, { useClass: MockClass }),
      provide(Config, { useClass: MockClass }),
      provide(IonicApp, { useClass: MockClass }),
      provide(Platform, { useExisting: MockPlatform }),
      SplashPage
    ]);

    beforeEach(async(inject([MockBackend, TestComponentBuilder], (backend: MockBackend, tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(SplashPage)
        .then((componentFixture: ComponentFixture<SplashPage>) => {
          splashPageFixture = componentFixture;
          splashPage = componentFixture.componentInstance;
          splashPageFixture.detectChanges();
          spyOn(splashPage, '_goToFirstPage').and.callThrough();
          spyOn(splashPage['_meStore'], 'loggedIn$').and.callThrough();
          spyOn(splashPage['_nav'], 'setRoot').and.callThrough();
        });
    })));

    it('initialises', () => {
      expect(splashPage).not.toBeNull();
      expect(splashPage['_nav']).not.toBeNull();
      expect(splashPage['_meStore']).not.toBeNull();
    });
  });
}
