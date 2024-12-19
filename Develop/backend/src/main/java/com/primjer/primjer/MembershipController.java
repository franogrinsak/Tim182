package com.primjer.primjer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MembershipController {
    private MembershipRepository MR;

    public MembershipController(MembershipRepository mr) {
        MR = mr;
    }
    @GetMapping("membership/get")
    public String getMP(){
        return MR.getPrice();
    }
    @PostMapping("membership/set")
    public void setMP(@RequestParam String membershipPrice){
        MR.setPrice(membershipPrice);
    }

}
