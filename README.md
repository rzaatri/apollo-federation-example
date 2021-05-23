# apollo-federation-example
Example repo for apollo federation investigations. 

Note: The src/apollo-complete-graph is an example of the same graph, but in a single apollo gql server instance.
Mostly there to run performance tests against compared to the federated service example. Use 'node index.js' to start in directory

# Sample Query
The following query provides an example data surfaced from the graph

query {
  product(id: "productA") {
    id,
    name,
    publisher,
    description
    basePrice,
    userPrice(discountPercent: 0.2)
    media {
      screenshots,
      videos,
    }
  },
  media {
    screenshots,
    videos
  }
}

# How to Run Locally (Ideal for Development)
## Install packages
npm install

## Start Services
npm run start-services (in one terminal)

## Start Gateway
npm run start-gateway (in another terminal)

## Open GQL Playground
Go to http://localhost:4000/

# How to Run Dockerized Images (Ideal for just running the services)
In the case you want to just stand up the services through dockerized images.

## Build Containers
docker compose build

## Run Containers
docker compose up

# Misc. Docker Notes
## To See All Images
docker images

## To See All Running Images
docker ps

## To Get Output of Container
docker logs <container id>

## To Stop Running Container
docker stop <container id>

## To Stop All Running Containers
docker stop $(docker ps -q)

## To see the all docker network configurations
docker network ls

## To inspect the details for a particular network
docker network inspect <network name> (ex. apollo-federation-example_default)

# k6
To run a sample k6 test, go to the test directory and run...

k6 run k6-load-test.js
