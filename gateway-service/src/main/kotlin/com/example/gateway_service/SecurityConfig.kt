package com.example.gateway_service

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.web.server.SecurityWebFilterChain

@Configuration
@EnableWebFluxSecurity
class SecurityConfig {

    @Bean
    fun gatewaySecurityWebFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http
            .csrf { it.disable() }
            .cors { it.disable() }
            .authorizeExchange { exchange ->
                exchange.pathMatchers("/", "/auth/**").permitAll()
                exchange.anyExchange().authenticated()
            }
            .oauth2ResourceServer { oauth2 ->
                oauth2.jwt(Customizer.withDefaults())
            }
            .build()
    }
}
