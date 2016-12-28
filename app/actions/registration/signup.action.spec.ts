import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, } from '@angular/core/testing';
import { Platform } from 'ionic-angular/index';
import { Http } from '@angular/http';
import { ApiClient, ApiClientOptions } from '../../utils';
import { RegistrationEndpoint } from '../../endpoints';
import { MeStore } from '../../stores';
import { SignupAction } from './signup.action';

class MockClass {
  public get(): any {
    return {};
  }
}

export function main(): void {
  describe('SignupAction', () => {
    let signupAction: SignupAction = null;

    beforeEachProviders(() => [
      provide(Platform, { useClass: MockClass }),
      provide(Platform, { useClass: MockClass }),
      provide(Http, { useClass: MockClass }),
      provide(ApiClient, { useClass: MockClass }),
      provide(ApiClientOptions, { useClass: MockClass }),
      provide(RegistrationEndpoint, { useClass: MockClass }),
      MeStore,
      SignupAction
    ]);

    beforeEach(inject([SignupAction], (_fbAuthenticationAction: SignupAction) => {
      signupAction = _fbAuthenticationAction;
    }));

    it('initialises', () => {
      expect(signupAction).not.toBeNull();
      expect(signupAction['_registrationEndpoint']).not.toBeNull();
    });

  });
}
