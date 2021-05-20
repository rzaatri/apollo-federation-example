# apollo-federation-example
Example repo for apollo federation investigations

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

# How to Run
## Start Services
npm run start-services

## Start Gateway
npm run start-gateway

## Open GQL Playground
Go to http://localhost:4000/
