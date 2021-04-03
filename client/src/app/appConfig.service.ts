import { environment } from '../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnvironment } from 'environments/envionment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: IEnvironment;
  constructor(private http: HttpClient) {}

  public loadConfig() {
    if (environment.production) {
      this.http
        .get('/assets/config/config.json')
        .toPromise()
        .then((config: IEnvironment) => {
          this.appConfig = config;
          console.log('Production', { config });
        });
    } else {
      this.appConfig = environment;
      console.log('Development', { environment });
    }
  }

  get config() {
    return this.appConfig;
  }
}

export const initializerFn = (appConfig: AppConfigService) => {
  console.log('initializerFn works');
  return () => {
    appConfig.loadConfig();
  };
};