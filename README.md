# Spring PetClinic Dockerized

Demo of taking the [petclinic Java app](https://github.com/spring-petclinic/spring-petclinic-angularjs) and adding the proper Docker files to make it easier for dev, test, and prod.

Check the [`pet-clinic-app/Dockerfile`](pet-clinic-app/Dockerfile) for multi-stage building of a .jar with maven

Check the [`docker-compose.yml`](docker-compose.yml) for a full-featured Dev setup with depends_on using true "wait-for-it" style dependency startup

## Bugs

- This currently seems to skip startup of the `sprint-petclinic-client` frontend, or at least missing a lot of static assets (js/css). PR's welcome (not sure if it's an app issue, or a docker build/run issue)

## Features

- Multi-stage Dockerfile with a build, security scan, and prod stage
- docker-compose.yml file with proper waiting of database startup

## Other Docker and Compose Tips

1. Use ssh to easily control a Docker Engine on another OS

    Here's an example of pointing docker and docker compose at a remote docker engine.
    Also works for using docker cli on host OS while docker runs in Vagrant or any VM.

    `DOCKER_HOST=ssh://user@host docker image ls`

    `DOCKER_HOST=ssh://user@host docker-compose up`

2. Enable BuildKit in Docker and Compose

    This may speed up your builds and provides advanced features.

    ```
    export DOCKER_BUILDKIT=1
    export COMPOSE_DOCKER_CLI_BUILD=1
    ```
