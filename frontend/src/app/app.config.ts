import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthConfig, OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

// This is the configuration for the OAuth2.0 Authorization Code Flow with PKCE 
// https://www.npmjs.com/package/angular-oauth2-oidc
// To configure go to http://localhost:8180/realms/sso-realm/.well-known/openid-configuration
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8180/realms/sso-realm',
  tokenEndpoint: 'http://localhost:8180/realms/sso-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
  clientId: 'angular-sso-client',
  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  //scope: 'openid profile email offline_access api',
  scope: 'openid profile',

  showDebugInformation: true,
}

function initializeOAuth(oauthService: OAuthService): Promise<void> {
  
  return new Promise<void>((resolve, reject) => {

    // Configure the OAuthService with the authCodeFlowConfig
    oauthService.configure(authCodeFlowConfig);

    oauthService.setupAutomaticSilentRefresh();

    // Load discovery document and login
    return oauthService.loadDiscoveryDocumentAndLogin()
      //.then(() => resolve())
      .then(() => {
        // Check if the user is logged in
        if (oauthService.hasValidAccessToken()) {
          console.log('User is logged in');
          resolve();
        } else {
          console.log('User is not logged in');
          reject('User is not logged in');
        }
      })
      .catch(error => {
        console.error('Error during OAuth initialization', error);
        reject('OAuth initialization failed');
      });


  });
  
  

}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(), // to use HttpClient and request API
    provideOAuthClient(), // to use OAuthClient

    // Old approach to use OAuthClient (before Angular 19)
    // { 
    //   provide: APP_INITIALIZER, // deprecated in Angular 19

    //   useFactory: (oauthService: OAuthService) => {
    //     return () => {
    //       initializeOAuth(oauthService);
    //     }
    //   }, 
    //   deps: [OAuthService], 
    //   multi: true 
    // },

    // New approach to use OAuthClient (Angular 19 and later)
    // https://angular.dev/api/core/provideAppInitializer
    // https://www.techiediaries.com/app_initializer-deprecated-angular-19-provideappinitializer/
    provideAppInitializer(() => {
      const oauthService = inject(OAuthService);
      //oauthService.initCodeFlow(); //NB: do not use this, you will get infinite loop
      return initializeOAuth(oauthService);
    }),
  ],
};
