import data from './data.js';

// Chunk below is only to prove out performance logic using prime factorization as an example
// https://stackoverflow.com/a/39899363
const enableExpensiveLogic = false;
const getPrimeFactors = (integer) => {
  const primeArray = [];
  let isPrime;

  // Find divisors starting with 2
  for (let i = 2; i <= integer; i++) {
    if (integer % i !== 0) continue;

    // Check if the divisor is a prime number
    for (let j = 2; j <= i / 2; j++) {
      isPrime = i % j !== 0;
    }

    if (!isPrime) continue;
    // if the divisor is prime, divide integer with the number and store it in the array
    integer /= i
    primeArray.push(i);
  }

  return primeArray;
};

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
