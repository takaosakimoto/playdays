'use strict';
import { Me } from './me.model';

export function main(): void {


  describe('me', () => {
    let me: Me = null;

    beforeEach(function() {
      me = new Me;
    });

    it('initialises', () => {
       expect(Me).not.toBeNull();
    });

  });
}
