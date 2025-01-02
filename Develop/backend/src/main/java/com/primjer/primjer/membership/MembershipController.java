package com.primjer.primjer.membership;

import org.springframework.security.access.annotation.Secured;
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

    @Secured({"ROLE_UNPAID_OWNER","ROLE_ADMIN"})
    @GetMapping("membership/get")
    public String getMP(){
        return MR.getPrice();
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("membership/set")
    public void setMP(@RequestParam String membershipPrice){
        MR.setPrice(membershipPrice);
    }

}
