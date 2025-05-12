package com.example.demospringbootoauth2keycloak.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demospringbootoauth2keycloak.jwt.CustomJwt;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/hello")
    @PreAuthorize("hasRole('ROLE_admin')")
    public Message hello() {
        var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        var message = String.format("Hello %s %s", jwt.getFirstname(), jwt.getLastname());
        return new Message(message);
    }

    record Message(String message) {}

}
