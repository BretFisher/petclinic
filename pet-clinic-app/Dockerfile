# This is a multi-stage java Dockerfile
#### first we build the jar with maven in a fat image with all the tools
FROM maven:3.6.3-openjdk-11 as build
# don't use root
# RUN groupadd --gid 1000 java \
#   && useradd --uid 1000 --gid java --shell /bin/bash --create-home java
# USER java
WORKDIR /app
# TODO: ideally we're copying in xml only and installing dependencies first
COPY ./spring-petclinic-client/pom.xml ./spring-petclinic-client/
COPY pom.xml .
COPY ./spring-petclinic-server/pom.xml ./spring-petclinic-server/
# install maven dependency packages, this takes about a minute
RUN mvn dependency:go-offline
# Then we copy in all source and build
# splitting out dependencies and source will save time in re-builds
COPY . .
# building should only take about 13 seconds across multiple CPU's
RUN mvn -T 1C install
WORKDIR /app/spring-petclinic-server
CMD ["../mvn", "spring-boot:run"]


#### an optional stage that auto runs test, security scans, etc.
FROM build as test
RUN apt-get update && apt-get install -y \
    git \
    jq \
    nodejs \
    npm && \
    rm -rf /var/lib/apt/lists/*;
RUN npm install --global snyk snyk-to-html
ARG SNYK_TOKEN
# Note: this RUN-style scan will cache if no files have changed
WORKDIR /app
RUN snyk test --all-projects


# this stage starts fresh with a minimal debian image and only copying over the jar
#### prod slim
FROM openjdk:11-jre-slim as prod
# we have to remake the java user again in this new base image
RUN groupadd --gid 1000 java \
  && useradd --uid 1000 --gid java --shell /bin/bash --create-home java
USER java
VOLUME /tmp
WORKDIR /app
COPY --from=build --chown=java:java /app/spring-petclinic-server/target/petclinic.jar /app/petclinic.jar
# To reduce Tomcat startup time we added a system property pointing to "/dev/urandom" as a source of entropy.
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/petclinic.jar"]