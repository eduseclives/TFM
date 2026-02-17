package com.example.auth_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.slf4j.LoggerFactory

@SpringBootApplication
class AuthServiceApplication {
    private val logger = LoggerFactory.getLogger(AuthServiceApplication::class.java)

    @Bean
    fun init() = CommandLineRunner {
        logger.info("**************************************************")
        logger.info("AUTH SERVICE STARTED - VERSION 2.0 (WITH DB AUTH)")
        logger.info("**************************************************")
    }
}

fun main(args: Array<String>) {
	runApplication<AuthServiceApplication>(*args)
}
