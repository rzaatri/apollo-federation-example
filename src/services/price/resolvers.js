const resolvers = {
  Product: {
    userPrice(product, args) {
      console.log('💰 pricing: calling product userPrice query resolver');
      return product.basePrice - (product.basePrice * args.discountPercent);
    },
  },
};

export default resolvers;
