This is a fullstack example implementing oauth2 (with keycloak 26, angular 19 and springboot 3).

This repo is based on the work of [Genka](www.youtube.com/@heygenka), more pricesely on his video [Fullstack OAuth2 - Angular, Spring Boot & Keycloak](https://www.youtube.com/watch?v=DLszg2ul85U) made on  2023-11-19 using Angular 17, SpringBoot3, SpringSecurity 6, Keycloak 22. More information can be find [here](https://github.com/tamani-coding/fullstack-oauth2-angular-spring-boot-keycloak)

## Resources 

- https://www.npmjs.com/package/angular-oauth2-oidc (Support for OAuth 2 and OpenId Connect (OIDC) in Angular)
- https://github.com/manfredsteyer/angular-oauth2-oidc 
- https://manfredsteyer.github.io/angular-oauth2-oidc/docs/index.html
- https://jwt.io (copy paste access_token from POST request to http://localhost:8180/realms/sso-realm/protocol/openid-connect/token)
- https://angular.dev/api/core/provideAppInitializer (APP_INITIALIZER is deprecated in Angular19)
- https://www.keycloak.org/server/importExport
- https://rxjs.dev/deprecations/subscribe-arguments 

## How to test

Launch postgresql and keycloak
```
docker-compose up -d
```

Launch Angular application: 
```
cd frontend
ng serve
```

Launch Springboot application:
```
cd backend
mvn spring-boot:run
```

With your browser, go to http://localhost:4200, you must be redirect to keycloak login page with "SSO-REALM" as title.

Users: 
- john.doe (john.doe@unknown.com)
- jane.doe (jane.doe@unknown.com)
- admin (keycloak admin web interface http://localhost:8081)

password are the same for all and is the first word of this line.

Stop keycloak and postgresql containers
```
docker-compose down
docker volume prune -a
```

## More information about Angular Part

Angular 19 is the current used version (2025-05-09). The npm dependency angular-oauth2-oidc will be used.

To build this part the following commands have been passed:
```
npm install -g @angular/cli
ng new frontend --style=scss
cd frontend
ng add angular-oauth2-oidc
```

NB: Angular material has been installed but is not required for the demo.

Usefull links: 
- http://localhost:8180/admin/master/console/#/sso-realm/users <- see users

- http://localhost:8180/realms/sso-realm/.well-known/openid-configuration
```json
{"issuer":"http://localhost:8180/realms/sso-realm","authorization_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/auth","token_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/token","introspection_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/token/introspect","userinfo_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/userinfo","end_session_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/logout","frontchannel_logout_session_supported":true,"frontchannel_logout_supported":true,"jwks_uri":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/certs","check_session_iframe":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/login-status-iframe.html","grant_types_supported":["authorization_code","client_credentials","implicit","password","refresh_token","urn:ietf:params:oauth:grant-type:device_code","urn:ietf:params:oauth:grant-type:token-exchange","urn:ietf:params:oauth:grant-type:uma-ticket","urn:openid:params:grant-type:ciba"],"acr_values_supported":["0","1"],"response_types_supported":["code","none","id_token","token","id_token token","code id_token","code token","code id_token token"],"subject_types_supported":["public","pairwise"],"prompt_values_supported":["none","login","consent"],"id_token_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512"],"id_token_encryption_alg_values_supported":["ECDH-ES+A256KW","ECDH-ES+A192KW","ECDH-ES+A128KW","RSA-OAEP","RSA-OAEP-256","RSA1_5","ECDH-ES"],"id_token_encryption_enc_values_supported":["A256GCM","A192GCM","A128GCM","A128CBC-HS256","A192CBC-HS384","A256CBC-HS512"],"userinfo_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512","none"],"userinfo_encryption_alg_values_supported":["ECDH-ES+A256KW","ECDH-ES+A192KW","ECDH-ES+A128KW","RSA-OAEP","RSA-OAEP-256","RSA1_5","ECDH-ES"],"userinfo_encryption_enc_values_supported":["A256GCM","A192GCM","A128GCM","A128CBC-HS256","A192CBC-HS384","A256CBC-HS512"],"request_object_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512","none"],"request_object_encryption_alg_values_supported":["ECDH-ES+A256KW","ECDH-ES+A192KW","ECDH-ES+A128KW","RSA-OAEP","RSA-OAEP-256","RSA1_5","ECDH-ES"],"request_object_encryption_enc_values_supported":["A256GCM","A192GCM","A128GCM","A128CBC-HS256","A192CBC-HS384","A256CBC-HS512"],"response_modes_supported":["query","fragment","form_post","query.jwt","fragment.jwt","form_post.jwt","jwt"],"registration_endpoint":"http://localhost:8180/realms/sso-realm/clients-registrations/openid-connect","token_endpoint_auth_methods_supported":["private_key_jwt","client_secret_basic","client_secret_post","tls_client_auth","client_secret_jwt"],"token_endpoint_auth_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512"],"introspection_endpoint_auth_methods_supported":["private_key_jwt","client_secret_basic","client_secret_post","tls_client_auth","client_secret_jwt"],"introspection_endpoint_auth_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512"],"authorization_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512"],"authorization_encryption_alg_values_supported":["ECDH-ES+A256KW","ECDH-ES+A192KW","ECDH-ES+A128KW","RSA-OAEP","RSA-OAEP-256","RSA1_5","ECDH-ES"],"authorization_encryption_enc_values_supported":["A256GCM","A192GCM","A128GCM","A128CBC-HS256","A192CBC-HS384","A256CBC-HS512"],"claims_supported":["aud","sub","iss","auth_time","name","given_name","family_name","preferred_username","email","acr"],"claim_types_supported":["normal"],"claims_parameter_supported":true,"scopes_supported":["openid","organization","offline_access","phone","acr","profile","address","roles","email","service_account","microprofile-jwt","basic","web-origins"],"request_parameter_supported":true,"request_uri_parameter_supported":true,"require_request_uri_registration":true,"code_challenge_methods_supported":["plain","S256"],"tls_client_certificate_bound_access_tokens":true,"revocation_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/revoke","revocation_endpoint_auth_methods_supported":["private_key_jwt","client_secret_basic","client_secret_post","tls_client_auth","client_secret_jwt"],"revocation_endpoint_auth_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","HS256","HS512","ES256","RS256","HS384","ES512","PS256","PS512","RS512"],"backchannel_logout_supported":true,"backchannel_logout_session_supported":true,"device_authorization_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/auth/device","backchannel_token_delivery_modes_supported":["poll","ping"],"backchannel_authentication_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/ext/ciba/auth","backchannel_authentication_request_signing_alg_values_supported":["PS384","RS384","EdDSA","ES384","ES256","RS256","ES512","PS256","PS512","RS512"],"require_pushed_authorization_requests":false,"pushed_authorization_request_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/ext/par/request","mtls_endpoint_aliases":{"token_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/token","revocation_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/revoke","introspection_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/token/introspect","device_authorization_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/auth/device","registration_endpoint":"http://localhost:8180/realms/sso-realm/clients-registrations/openid-connect","userinfo_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/userinfo","pushed_authorization_request_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/ext/par/request","backchannel_authentication_endpoint":"http://localhost:8180/realms/sso-realm/protocol/openid-connect/ext/ciba/auth"},"authorization_response_iss_parameter_supported":true}
```

## More information about Springboot part

To build this part, Spring Initializr has been used (https://start.spring.io/index.html)
SpringBoot 3.4.5 is the stable version at the moment (2025-05-09)

Mandatory Dependencies: 
- Spring Web
- Spring Security
- OAuth2 Resource Server

