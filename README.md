# apollo-federation-example
Example repo for apollo federation investigations

Sample Query

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