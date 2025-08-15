# ---------- build stage ----------
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /build
COPY . .
RUN mvn -DskipTests package

# ---------- runtime stage ----------
FROM eclipse-temurin:21-jre
WORKDIR /work
COPY --from=build /build/target/quarkus-app/ /work/
EXPOSE 8080
ENV QUARKUS_PROFILE=prod
ENTRYPOINT ["java","-jar","/work/quarkus-run.jar"]
