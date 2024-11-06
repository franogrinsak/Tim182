package com.primjer.primjer;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    private UserRepository userRepo;

    public Controller(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/")
    public String home(){
        return "Home";
    }
    @GetMapping("/logged")
    public User logged(OAuth2AuthenticationToken token){
        String email=token.getPrincipal().getAttribute("email");
        User user= userRepo.getUser(email);
        return user;
    }
    @PostMapping("/logged")
    public void logged(@RequestBody User user){
        userRepo.updateUser(user);
    }

}
