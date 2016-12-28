import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular/index';
import { Toast as Toastr } from 'ionic-native';

@Injectable()
export class Toast {

  constructor(
    private _platform: Platform
  ) {
    if (!this._platform.is('cordova')) {
      console.debug('Please run me on a device');
    };
  }

  public create(message: string): void {
    const options = {
      message: message,
      duration: 4000,
      position: 'top',
      addPixelsY: 32,
      styling: {
        opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
        backgroundColor: '#0FB3A6', // make sure you use #RRGGBB. Default #333333
        textColor: '#FFFFFF',
        cornerRadius: 0, // minimum is 0 (square). iOS default 20, Android default 100
        // horizontalPadding: 200, // iOS default 16, Android default 50
        // verticalPadding: 20 // iOS default 12, Android default 30
      }
    }
    this._platform.ready().then(
      () => Toastr.showWithOptions(options).subscribe(
        toast => console.log('toaster message success', toast),
        error => console.log('toaster message error', error),
        () => console.log('toaster message completed')
      )
    );
  }

}
