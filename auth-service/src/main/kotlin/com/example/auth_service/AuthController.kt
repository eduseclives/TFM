package com.example.auth_service

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import jakarta.persistence.*
import org.slf4j.LoggerFactory
import jakarta.annotation.PostConstruct
import org.springframework.security.oauth2.jwt.JwtClaimsSet
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.JwtEncoderParameters
import java.time.Instant

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val username: String = "",
    val password: String = "",
    val role: String = "USER"
)

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(username: String): User?
}

data class LoginRequest(val username: String, val password: String)



@RestController
class AuthController(
    private val userRepository: UserRepository,
    private val jwtEncoder: JwtEncoder
) {
    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostConstruct
    fun init() {
        logger.info("AUTH CONTROLLER LOADED SUCCESSFULLY - JWT ENABLED")
    }

    @GetMapping("/test-db")
    fun testDb(): ResponseEntity<Any> {
        return try {
            val count = userRepository.count()
            ResponseEntity.ok(mapOf("status" to "DB Connection OK", "userCount" to count))
        } catch (e: Exception) {
            logger.error("DB Error: ", e)
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to e.message))
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<Any> {
        logger.info("Login attempt for user: {}", request.username)
        return try {
            val user = userRepository.findByUsername(request.username)
            logger.info("User found: {}", user != null)
            
            if (user != null && user.password == request.password) {
                val now = Instant.now()
                val claims = JwtClaimsSet.builder()
                    .issuer("auth-service")
                    .issuedAt(now)
                    .expiresAt(now.plusSeconds(3600)) // 1 hour expiration
                    .subject(user.username)
                    .claim("role", user.role)
                    .build()
                
                val token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
                logger.info("Token generated successfully for {}: {}...", user.username, token.substring(0, 10))

                ResponseEntity.ok(mapOf(
                    "token" to token,
                    "username" to user.username,
                    "role" to user.role
                ))
            } else {
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("error" to "Invalid credentials"))
            }
        } catch (e: Exception) {
            logger.error("Error during login for {}: ", request.username, e)
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to e.message))
        }
    }

    @GetMapping("/oauth2/jwks")
    fun jwks(): Map<String, Any> {
        return mapOf("keys" to listOf<String>())
    }
}
