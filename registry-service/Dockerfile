# Build stage
FROM gradle:8.5-jdk21-alpine AS build
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
RUN ./gradlew dependencies
COPY src src
RUN ./gradlew build -x test

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=build /app/build/libs/registry-service.jar app.jar
ENTRYPOINT ["java","-XX:+UseContainerSupport","-jar","/app/app.jar"]
