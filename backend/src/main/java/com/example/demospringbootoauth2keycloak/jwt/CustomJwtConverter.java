package com.example.demospringbootoauth2keycloak.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.GrantedAuthority;

public class CustomJwtConverter implements Converter<Jwt, CustomJwt> {

    // Check jwt token with https://jwt.io
    // copy paste access_token from POST request to get token (ie http://localhost:8180/realms/sso-realm/protocol/openid-connect/token)

    @Override
    public CustomJwt convert(Jwt source) {
        List<GrantedAuthority> grantedAuthorities = extractAuthorities(source);
        CustomJwt customJwt = new CustomJwt(source, grantedAuthorities);
        customJwt.setFirstname(source.getClaimAsString("given_name"));
        customJwt.setLastname(source.getClaimAsString("family_name"));
        customJwt.setEmail(source.getClaimAsString("email"));
        return customJwt;
    }

    // source: https://medium.com/@mohammad.h.zbib/solving-jwt-role-mapping-issues-in-spring-boot-with-keycloak-3f40db57216e
    private ArrayList<GrantedAuthority> extractAuthorities(Jwt source) {
        var result = new ArrayList<GrantedAuthority>();

        Map<String, Object> realmAccess = source.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            var roles = (List<String>) realmAccess.get("roles");
            roles.forEach(role -> {
                var authority = new SimpleGrantedAuthority("ROLE_" + role);
                result.add(authority);
            });
        }
        return result;
    }
    
}
