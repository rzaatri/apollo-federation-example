import data from './data.js';
import getPrimeFactors from './getPrimeFactors.js';

const enableExpensiveLogic = false;

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

      // Note: Only added to test performance isolation
      if (enableExpensiveLogic) {
        getPrimeFactors(Math.floor(Math.random()*1000000000));
      }

      return Object.values(data).reduce(reducer);
    }
  }
};

export default resolvers;
