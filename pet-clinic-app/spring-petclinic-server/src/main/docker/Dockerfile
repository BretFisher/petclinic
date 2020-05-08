FROM openjdk:alpine
# Spring Boot application creates working directories for Tomcat by default
VOLUME /tmp
ADD petclinic.jar petclinic.jar
# To reduce Tomcat startup time we added a system property pointing to "/dev/urandom" as a source of entropy.
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/petclinic.jar"]
