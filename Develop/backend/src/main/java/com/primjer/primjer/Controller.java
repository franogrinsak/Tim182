package com.primjer.primjer;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/")
    public String home(){
        return "Home";
    }
    @GetMapping("/logged")
    public String logged(OAuth2AuthenticationToken token){
        String email=token.getPrincipal().getAttribute("email");
        return email;
    }

}
