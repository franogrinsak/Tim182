package com.primjer.primjer;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @GetMapping("/owner")
    public User owner(@RequestParam int userId){
        return userRepo.getOwner(userId);
    }
    @PostMapping("/owner/edit")
    public void editOwner(@RequestBody User user){
        userRepo.updateOwner(user);
    }

    @GetMapping("/users/all")
    public List<User> getAllUsers(@RequestParam int userId){
        return userRepo.getAllUsers();
    }
    @PostMapping("/users/add")
    public void addUser(@RequestBody User user){
        userRepo.addUser(user);
    }

    @PostMapping("/users/edit")
    public void editUser(@RequestBody User user){
        userRepo.editUser(user);
    }
}
