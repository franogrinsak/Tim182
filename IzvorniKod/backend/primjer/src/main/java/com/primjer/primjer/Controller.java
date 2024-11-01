package com.primjer.primjer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/")
    public String home(){
        return "Home";
    }
    @GetMapping("/logged")
    public String logged(){
        return "Logged";
    }
}
