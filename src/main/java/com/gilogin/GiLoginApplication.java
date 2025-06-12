package com.gilogin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GiLoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(GiLoginApplication.class, args);
	}

}
