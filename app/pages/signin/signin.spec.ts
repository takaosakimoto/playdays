import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  async,
  it,
} from '@angular/core/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
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

import { provide } from '@angular/core';
import {
  IonicApp,
  Platform,
  NavController,
  NavParams,
  Form,
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
import {
  FORM_PROVIDERS,
  FORM_DIRECTIVES
} from '@angular/common';
// import { TestUtils }     from '../../../test/testUtils';
// import { FBClient } from '../../utils';
// import { MeStore } from '../../stores';
import { LoginEndpoint } from '../../endpoints';
import { SigninPage } from './signin';


class MockClass {
  public get(): any {
    return {};
  }

  register(id: string, component: any): void {
    return;
  }

};

export function main(): void {

  describe('SigninPage', () => {
    let signinPageFixture: ComponentFixture<SigninPage><SigninPage>;
    let signinPage: SigninPage;

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
      FORM_PROVIDERS,
      ...FORM_DIRECTIVES,
      provide(NavController, { useClass: MockClass }),
      provide(NavParams, { useClass: MockClass }),
      provide(Config, { useClass: MockClass }),
      provide(IonicApp, { useClass: MockClass }),
      provide(Platform, { useClass: MockClass }),
      provide(LoginEndpoint, { useClass: MockClass }),
      Form,
      SigninPage
    ]);

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(SignupPage)
        .then((componentFixture: ComponentFixture<SigninPage>) => {
          signinPageFixture = componentFixture;
          signinPage = componentFixture.componentInstance;
          signinPageFixture.detectChanges();
        });
    })));

    it('initialises', () => {
      expect(signinPage).not.toBeNull();
      expect(signinPage['_nav']).not.toBeNull();
    });

  });
}
