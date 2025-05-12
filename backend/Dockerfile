FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN mvn package 

FROM eclipse-temurin:21.0.7_6-jre-alpine-3.21 
RUN mkdir -p /app
COPY --from=build /app/target/demo-springboot-oauth2-keycloak-0.0.1-SNAPSHOT.jar /app
EXPOSE 8080
CMD ["java", "-jar", "/app/demo-springboot-oauth2-keycloak-0.0.1-SNAPSHOT.jar"]