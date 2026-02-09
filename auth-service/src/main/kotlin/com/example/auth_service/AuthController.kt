package com.example.auth_service

import org.springframework.security.oauth2.jwt.JwtClaimsSet
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.JwtEncoderParameters
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

// Simple login request DTO
data class LoginRequest(val username: String, val password: String)

@RestController
class AuthController(private val jwtEncoder: JwtEncoder) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): Map<String, String> {
        // In a real app, authenticate via AuthenticationManager
        // authenticationManager.authenticate(UsernamePasswordAuthenticationToken(request.username, request.password))
        
        // For demo, accept any non-empty credential
        if (request.username.isBlank() || request.password.isBlank()) {
               throw IllegalArgumentException("Invalid credentials")
        }

        val now = Instant.now()
        val claims = JwtClaimsSet.builder()
            .issuer("http://localhost:8081")
            .issuedAt(now)
            .expiresAt(now.plusSeconds(3600))
            .subject(request.username)
            .claim("roles", listOf("USER"))
            .build()

        val token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
        return mapOf("token" to token)
    }
}
