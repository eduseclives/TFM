---
name: secure-development
description: Guía de mejores prácticas de seguridad para el desarrollo de microservicios con Spring Boot, Kotlin y JWT.
---

# Skill de Desarrollo Seguro

Esta skill proporciona directrices y mejores prácticas para garantizar que el desarrollo de microservicios en este proyecto sea seguro por diseño.

## 1. Spring Security & JWT

### Configuración de HttpSecurity
Asegúrate de configurar `HttpSecurity` de forma restrictiva.

```kotlin
@Bean
fun filterChain(http: HttpSecurity): SecurityFilterChain {
    http
        .csrf { it.disable() } // Deshabilitar solo si se usan JWTs sin cookies
        .sessionManagement { it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
        .authorizeHttpRequests { auth ->
            auth.requestMatchers("/api/v1/auth/**").permitAll()
            auth.anyRequest().authenticated()
        }
        .oauth2ResourceServer { oauth2 ->
            oauth2.jwt { }
        }
    return http.build()
}
```

### Mejores Prácticas de JWT
- **Algoritmos**: Usa algoritmos fuertes como RS256 (clave asimétrica) o HS512 (clave simétrica larga).
- **Expiración**: Mantén tiempos de vida cortos para Access Tokens.
- **Validación**: Valida siempre el `issuer`, `audience` y la firma.

## 2. Validación y Prevención de Inyecciones

### Validación de DTOs
Usa anotaciones de `spring-boot-starter-validation` para validar la entrada.

```kotlin
data class UserRegistrationRequest(
    @field:NotBlank @field:Email val email: String,
    @field:NotBlank @field:Size(min = 8) val password: String
)
```

### Prevención de SQL Injection
Usa siempre Spring Data JPA o `JdbcTemplate` con parámetros. **Nunca concates strings para formar queries.**

## 3. Manejo Seguro de Datos

### Secretos y Credenciales
> [!CAUTION]
> NUNCA guardes contraseñas, claves de API o secretos en el código fuente.

Usa variables de entorno o un gestor de secretos (Spring Cloud Vault, AWS Secrets Manager, etc.).

### Hashing de Contraseñas
Usa `BCryptPasswordEncoder` o `Argon2` para guardar contraseñas.

```kotlin
@Bean
fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
```

## 4. Seguridad en Docker

### Dockerfile "Distroless" o Alpine
Reduce la superficie de ataque usando imágenes base mínimas.

```dockerfile
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 5. Auditoría y Logs
- No registres información sensible (PII) en los logs (ej. números de tarjeta, contraseñas).
- Usa `Actuator` para monitoreo, pero protege sus endpoints.
