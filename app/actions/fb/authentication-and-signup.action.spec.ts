import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { Platform } from 'ionic-angular/index';
import { FBClient } from '../../utils';
import { MeStore } from '../../stores';
import { FBAuthenticationAndSignupAction } from './authentication-and-signup.action';

class MockClass {
  public get(): any {
    return {};
  }

  public is(): any {
    return true;
  }
}

export function main(): void {

  describe('FBAuthenticationAndSignupAction', () => {
    let fbAuthenticationAction: FBAuthenticationAndSignupAction = null;

    beforeEachProviders(() => [
      provide(Platform, { useClass: MockClass }),
      FBClient,
      MeStore,
      FBAuthenticationAndSignupAction
    ]);

    beforeEach(inject([FBAuthenticationAndSignupAction], (_fbAuthenticationAction: FBAuthenticationAndSignupAction) => {
      fbAuthenticationAction = _fbAuthenticationAction;
    }));

    it('initialises', () => {
      expect(fbAuthenticationAction).not.toBeNull();
      expect(fbAuthenticationAction['_fbClient']).not.toBeNull();
      expect(fbAuthenticationAction['_meStore']).not.toBeNull();
    });

  });
}
