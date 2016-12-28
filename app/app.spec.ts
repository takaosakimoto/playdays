import { IonicApp, Platform } from 'ionic-angular/index';
import { PlaydaysApp } from './app';
import { SplashPage } from './pages/splash/splash';


export function main(): void {

  describe('PlaydaysApp', () => {
    let playdaysApp: PlaydaysApp = null;

    beforeEach(function() {
      let ionicApp: IonicApp = new IonicApp(null, null, null);
      let platform = new Platform();
      playdaysApp = new PlaydaysApp(ionicApp, platform);
    });

    it('initialises', () => {
      expect(playdaysApp).not.toBeNull();
      expect(playdaysApp['app']).not.toBeNull();
      expect(playdaysApp['rootPage']).not.toBeNull();
    });

    it('initialises with splashPage as root page', () => {
      expect(playdaysApp['rootPage']).toEqual(SplashPage);
    });
  });
}
