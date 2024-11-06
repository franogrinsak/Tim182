package com.primjer.primjer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class PrimjerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrimjerApplication.class, args);
	}

}
