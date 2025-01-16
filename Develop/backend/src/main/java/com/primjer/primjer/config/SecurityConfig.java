package com.primjer.primjer.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {
    private final AuthSuccessHandler authHandler;

    // Only domain of the frontend with the scheme, does not contain the path
    @Value("${frontend.domain}")
    private String FRONTEND_DOMAIN;
    public SecurityConfig(AuthSuccessHandler authHandler) {
        this.authHandler = authHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        return http.csrf(AbstractHttpConfigurer::disable).cors(cors -> cors.configurationSource(corsConfigurationSource())).authorizeHttpRequests(auth->{
            auth.requestMatchers("/","/login","/webhook").permitAll();
            auth.anyRequest().authenticated();
        }).exceptionHandling(exception -> exception.authenticationEntryPoint(customAuthenticationEntryPoint())).oauth2Login(oauth2 -> oauth2
                .successHandler(authHandler)).logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl(FRONTEND_DOMAIN)
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                )
                .build();
    }
    private AuthenticationEntryPoint customAuthenticationEntryPoint() {
        return (HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) -> {
            response.setContentType("application/json");
            response.setStatus(401);
            response.getWriter().write("{\"message\": \"Unauthorized\"}");

        };
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(FRONTEND_DOMAIN));
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", configuration);
        return urlBasedCorsConfigurationSource;
    }

}
