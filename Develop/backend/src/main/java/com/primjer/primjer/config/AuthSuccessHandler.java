package com.primjer.primjer.config;

import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.util.List;

@Component
public class AuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepo;

    @Value("${frontend.url}")
    private String FRONTEND_URL;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        String email = token.getPrincipal().getAttribute("email");
        if(!userRepo.userExist(email)) {
            User user = new User();
            user.setEmail(email);
            userRepo.storeUser(user);
        }
        User user=userRepo.getUser(email);
        String role=userRepo.getRoleName(user.getRoleId());
        System.out.println("role is:"+role);
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);  // Prefix with "ROLE_"


        Authentication updatedAuthentication = new OAuth2AuthenticationToken(
                token.getPrincipal(),
                List.of(authority),  // Single authority here
                token.getAuthorizedClientRegistrationId()
        );
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(FRONTEND_URL);
        super.onAuthenticationSuccess(request, response, authentication);

    }
}
