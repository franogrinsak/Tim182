package com.primjer.primjer.user;

import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public void logged(@RequestBody User user, OAuth2AuthenticationToken token){
        userRepo.updateUser(user);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String role=userRepo.getRoleName(user.getRoleId() == 4 ? 3 : user.getRoleId());
        List<GrantedAuthority> updatedAuthorities = new ArrayList<>(auth.getAuthorities());
        updatedAuthorities.set(0, new SimpleGrantedAuthority("ROLE_" + role));  // Prefix with "ROLE_"


        Authentication updatedAuthentication = new OAuth2AuthenticationToken(
                token.getPrincipal(),
                updatedAuthorities,  // Single authority here
                token.getAuthorizedClientRegistrationId()
        );

        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
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
    public List<User> getAllUsers(){
        return userRepo.getAllUsers();
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/users/get")
    public User getUser(@RequestParam int userId){
        return userRepo.getUserFromId(userId);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/users/add")
    public ResponseEntity<String> addUser(@RequestBody User user){
        if (userRepo.userExist(user.getEmail())) {
            return ResponseEntity.status(400).body("That email is already being used");
        }
        userRepo.addUser(user);
        return ResponseEntity.ok().build();
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/users/delete")
    public void deleteUser(@RequestParam int userId){
        userRepo.deleteUser(userId);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/users/edit")
    public ResponseEntity<String> editUser(@RequestBody User user){
        if (userRepo.userExistExcludeId(user.getEmail(), user.getUserId())) {
            return ResponseEntity.status(400).body("That email is already being used");
        }
        userRepo.editUser(user);
        return ResponseEntity.ok().build();
    }
}
