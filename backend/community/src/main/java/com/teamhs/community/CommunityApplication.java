package com.teamhs.community;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@SpringBootApplication
@RestController
@SpringBootApplication(exclude = SecurityAutoConfiguration.class) //Security 꺼두기
public class CommunityApplication {
    public static void main(String[] args) {
		SpringApplication.run(CommunityApplication.class, args);
    }
	@RequestMapping("/")
	public String home() {
		return "hello world spring";
	}
}
