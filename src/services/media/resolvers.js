import data from './data.js';

const resolvers = {
  Product: {
    media(product) {
      console.log('🎬 media: calling product media query resolver');
      return data[product.id];
    },
  },
  Query: {
    media() {
      console.log('🎬 media: calling root media query resolver');
      const reducer = (acc, gameMedia = { screenshots: [], videos: []}) => 
        ({ screenshots: [...acc.screenshots, ...gameMedia.screenshots], videos: [...acc.videos, ...gameMedia.videos] });

      return Object.values(data).reduce(reducer);
    }
  }
};

export default resolvers;
