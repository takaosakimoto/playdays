export interface IDevice {
  fbSessionKey: boolean;
  fbAccessToken: string;
  fbExpiresIn: number;
}

export interface IUpdateDeviceRequest {
  uuid: string;
  params: {
    device_token: string
    platform: string
  };
}
