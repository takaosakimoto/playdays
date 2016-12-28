import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  async,
  it
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
  Config,
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
import { MeStore } from '../../stores';
import { VerifyAccessTokenEndpoint } from '../../endpoints';
import { VerifyFBAuthenticationAction, FBAuthenticationAndSignupAction } from '../../actions';
import { AuthenticationPage } from './authentication';


class MockClass {
  public get(): any {
    return {};
  }

  register(id: string, component: any): void {
    return;
  }

};

class MockPlatform extends Platform {
  constructor() {
    super();
  }
}

export function main(): void {

  describe('HomePage', () => {
    let authenticationPageFixture: ComponentFixture<AuthenticationPage>;
    let authenticationPage: AuthenticationPage;

    beforeEachProviders(() => [
      BaseRequestOptions,
      MockBackend,
      provide(Http, {
        useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => new Http(backend, defaultOptions),
        deps: [MockBackend, BaseRequestOptions]
      }),
      DefaultApiClientOptions,
      ConfigApiClientOptions,
      provide(ApiClient, {
        useFactory: (http: Http, options: ApiClientOptions) => new ApiClient(http, options),
        deps: [Http, ConfigApiClientOptions]
      }),
      MockPlatform,
      provide(FBClient, {
        useFactory: (platform: MockPlatform) => new FBClient(platform),
        deps: [MockPlatform]
      }),
      provide(EndpointOptions, { useClass: ExtendEndpointOptions }),
      ...ENDPOINT_PROVIDERS,
      ...STORE_PROVIDERS,
      provide(NavController, { useClass: MockClass }),
      provide(NavParams, { useClass: MockClass }),
      provide(Config, { useClass: MockClass }),
      provide(IonicApp, { useClass: MockClass }),
      provide(Platform, { useValue: MockPlatform }),
      provide(VerifyAccessTokenEndpoint, { useClass: MockClass }),
      MeStore,
      VerifyFBAuthenticationAction,
      FBAuthenticationAndSignupAction,
    ]);

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(AuthenticationPage)
        .then((componentFixture: ComponentFixture<AuthenticationPage>) => {
          authenticationPageFixture = componentFixture;
          authenticationPage = componentFixture.componentInstance;
          authenticationPageFixture.detectChanges();
        });
    })));

    it('initialises', () => {
      expect(authenticationPage).not.toBeNull();
      expect(authenticationPage['_nav']).not.toBeNull();
    });

    it('render 2 button', () => {
      let buttonCount = authenticationPageFixture.nativeElement.querySelectorAll('button').length;
      expect(buttonCount).toEqual(2);
    });

  });
}
