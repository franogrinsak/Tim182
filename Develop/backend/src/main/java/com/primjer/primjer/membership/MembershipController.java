package com.primjer.primjer.membership;

import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MembershipController {
    private MembershipRepository MR;

    private UserRepository userRepo;

    @Value("${frontend.url}")
    private String FRONTEND_URL;

    public MembershipController(MembershipRepository mr, UserRepository userRepo) {
        MR = mr;
        this.userRepo = userRepo;
    }

    @Secured({"ROLE_UNPAID_OWNER","ROLE_ADMIN"})
    @GetMapping("membership/get")
    public String getMP() { return MR.getPrice(); }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("membership/set")
    public void setMP(@RequestParam String membershipPrice){
        MR.setPrice(membershipPrice);
    }


    @GetMapping("membership/context")
    public RedirectView updateSecurityContext(OAuth2AuthenticationToken token) {
        String email = token.getPrincipal().getAttribute("email");
        User user=userRepo.getUser(email);
        String role=userRepo.getRoleName(user.getRoleId());
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);  // Prefix with "ROLE_"


        Authentication updatedAuthentication = new OAuth2AuthenticationToken(
                token.getPrincipal(),
                List.of(authority),  // Single authority here
                token.getAuthorizedClientRegistrationId()
        );
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(FRONTEND_URL); // Target URL
        return redirectView;
    }
}
