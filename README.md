# apollo-federation-example
Example repo for apollo federation investigations. 

# How to Run Locally (Ideal for Development)
1. Install npm packages
```
npm install
```

2. Start all federated services in one terminal
```
npm run start-services
```

3. Start the federated gateway service in another terminal
```
npm run start-gateway
```

4. Open the GQL Playground in the browser http://localhost:4000/

# How to Run Dockerized Images (Ideal for Quickly Running)
In the case you want to just stand up the services through dockerized images, you can build and run the containers.

This of course requires that you have docker on your sytem. The most straightforward way is through [Docker Desktop](https://www.docker.com/products/docker-desktop).

1. Build Containers
```
docker compose build
```

2. Run Containers
```
docker compose up
```

Note: Currently there's a race condition issue with how the services are started. The federated services should boot first before the gateway starts. If you see an error message, try the "docker compose up" step again. In the future, will need to figure how to properly get readiness ordering working.

## Misc. Docker Commands
| Action  | Command |
| ------------- | ------------- |
| See all images on your machine  | ```docker images```  |
| See all running containers  | ```docker ps``` |
| Get the output of a container  | ```docker logs <container id>``` |
| Stop running a container | ```docker stop <container id>``` |
| Stop running all containers  | ```docker stop $(docker ps -q)``` |
| See docker network configurations  | ```docker network ls``` |
| See details for a particular network | ```docker network inspect <network name> (ex. apollo-federation-example_default)``` |

# Sample Query
The following query provides an example data surfaced from the graph

```
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
```

# Single GQL Instance Example
src/apollo-complete-graph is an example of the same graph, but in a single apollo gql server instance.

Mostly there to run performance tests against compared to the federated service example. 

To run, go to the [apollo-complete-graph directory](https://github.com/rzaatri/apollo-federation-example/tree/master/src/apollo-complete-graph) and run the following:

```
npm install
node index.js
```

# k6
To run a sample k6 test comparing load and response times between services, go to the [test directory](https://github.com/rzaatri/apollo-federation-example/tree/master/test) and run the following:

```
k6 run k6-load-test.js
```
