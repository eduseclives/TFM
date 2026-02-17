package com.example.gateway_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
class GatewayServiceApplication

@RestController
class RootController {
    @GetMapping("/")
    fun home() = mapOf("status" to "Gateway is running", "message" to "Welcome to the API Gateway")
}

fun main(args: Array<String>) {
	runApplication<GatewayServiceApplication>(*args)
}
