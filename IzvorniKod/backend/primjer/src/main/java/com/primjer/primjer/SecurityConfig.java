package com.primjer.primjer;

import org.springframework.boot.autoconfigure.batch.BatchDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        return http.authorizeHttpRequests(auth->{
            auth.requestMatchers("/","/login").permitAll();
            auth.anyRequest().authenticated();
        }).oauth2Login(Customizer.withDefaults()).formLogin(Customizer.withDefaults()).build();
    }

}
