package com.primjer.primjer.user;

import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import org.springframework.security.access.annotation.Secured;
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

    @Secured({"ROLE_NEW_USER"})
    @PostMapping("/logged")
    public void logged(@RequestBody User user){
        userRepo.updateUser(user);
    }

    @Secured({"ROLE_OWNER", "ROLE_PLAYER"})
    @GetMapping("/owner")
    public User owner(@RequestParam int userId){
        return userRepo.getOwner(userId);
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/owner/edit")
    public void editOwner(@RequestBody User user){
        userRepo.updateOwner(user);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/users/all")
    public List<User> getAllUsers(@RequestParam int userId){
        return userRepo.getAllUsers();
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/users/add")
    public void addUser(@RequestBody User user){
        userRepo.addUser(user);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/users/edit")
    public void editUser(@RequestBody User user){
        userRepo.editUser(user);
    }
}
