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
import { RegistrationEndpoint } from '../../endpoints';
import { SignupPage } from './signup';


class MockClass {
  public get(): any {
    return {};
  }

  register(id: string, component: any): void {
    return;
  }

};

export function main(): void {

  describe('SignupPage', () => {
    let signupPageFixture: ComponentFixture<SignupPage><SignupPage>;
    let signupPage: SignupPage;

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
      provide(RegistrationEndpoint, { useClass: MockClass }),
      Form,
      SignupPage
    ]);

    beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb
        .createAsync(SignupPage)
        .then((componentFixture: ComponentFixture<SignupPage>) => {
          signupPageFixture = componentFixture;
          signupPage = componentFixture.componentInstance;
          signupPageFixture.detectChanges();
        });
    })));

    it('initialises', () => {
      expect(signupPage).not.toBeNull();
      expect(signupPage['_nav']).not.toBeNull();
    });

    it('passes signup params to _signupAction', () => {
      // let email: string = 'test@gmail.com';
      // let emailInput: any = signupPageFixture.nativeElement.querySelectorAll('.text-input')[0];
      // let button: any = signupPageFixture.nativeElement.querySelectorAll('button')[0];
      // spyOn(Utils, 'resetControl').and.callThrough();
      // emailInput.value = email;
      // signupPageFixture.detectChanges();
      // signupPage['emailInput']['updateValue'](email, true);
      // TestUtils.eventFire(input, 'input');
      // TestUtils.eventFire(button, 'click');
      // expect(signupPageFixture.newClicker).toHaveBeenCalledWith(Object({ emailInput: email }));
      // expect(signupPageFixture['clickerService'].newClicker).toHaveBeenCalledWith(email);
      // expect(Utils.resetControl).toHaveBeenCalledWith(signupPage['emailInput']);
    });

  });
}
