import { ApiClientOptions, DefaultApiClientOptions } from './api-client-options';

export function main(): void {

  describe('ApiClientOptions', () => {
    let apiClientOptions: ApiClientOptions;

    beforeEach(function() {
      apiClientOptions = new ApiClientOptions();
    });

    it('should able to define baseUrl', () => {
      apiClientOptions.baseUrl = './consumer/v1';
      expect(apiClientOptions.baseUrl).toBe('./consumer/v1');
    });

  });

  describe('DefaultApiClientOptions', () => {
    let defaultApiClientOptions: DefaultApiClientOptions;

    beforeEach (function() {
      defaultApiClientOptions = new DefaultApiClientOptions();
    });

    it('should has a default baseUrl', () => {
      expect(defaultApiClientOptions.baseUrl).toBe('./consumer/v1');
    });
  });
}

