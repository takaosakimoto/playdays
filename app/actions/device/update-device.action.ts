import { Injectable } from '@angular/core';
import { Action } from '../../engine/action';
import { IUpdateDeviceRequest } from '../../interfaces';
import { Device } from '../../models';
import { DeviceEndpoint } from '../../endpoints';

@Injectable()
export class UpdateDeviceAction extends Action<IUpdateDeviceRequest, Device> {

  constructor(
    private _deviceEndpoint: DeviceEndpoint
  ) {
    super();
  }

  onExecute(request: IUpdateDeviceRequest): void {
    this._deviceEndpoint.update(request.uuid, request.params)
      .subscribe(
        (device: Device): void => {
          //
          console.log(device);
        },
          e => this.error$.next(e)
      );
  }
}
