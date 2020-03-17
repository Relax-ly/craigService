// const db = require('db');
const faker = require('faker')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Relaxly', {useNewUrlParser: true});


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const houseTypes = ['Entire House', 'Entire Apartment', 'Entire Villa']

const makeBedsAndHouseString = () => {
  if (getRandomInt(0,1)) {
    return `${houseTypes[getRandomInt(0,2)]} - ${getRandomInt(2,10)} beds`
  } else {
    return `Private Room - ${getRandomInt(1,3)} beds`
  }
}

const makeDescription = () => {
  const adjectives = ['Georgeous', 'Rustic', 'Incredible', 'Breathtaking', 'Romantic', 'Beautiful', 'Amazing', 'Luxurious', 'Designer', 'Supurb', 'Unique', 'Exceptional', 'Perfect', 'Stylish', 'Private', 'Unique', 'Historic', 'Magical', 'Classical', 'Radiant', 'Charming']
  const descriptors = ['Tropical', 'Mountain', 'Beach', 'Forest', 'Desert', 'Hill-side', 'Secluded', 'Cozy', 'Lively', 'City', 'Suburban', 'Jungle', 'Woodsy', 'Wine-Country', 'Lakeside', 'Spacious', 'Backcountry', 'Quiet', 'Sunny', 'Waterfront', 'Coastal'];
  const houses = ['Home', 'Apartment', 'Villa', 'Condo', 'Chateau', 'Hacienda', 'Estate', 'Bungalow', 'Cottage', 'Cabin', 'Pied-à-Terre', 'Lodge', 'Ranch', 'Penthouse', 'Castle', 'Oasis', 'Farm', 'Farmhouse', 'Ecolodge', 'Yurt'];
  return `${adjectives[getRandomInt(0,adjectives.length-1)]} ${descriptors[getRandomInt(0,descriptors.length-1)]} ${houses[getRandomInt(0, houses.length-1)]}`
}

// for (var i = 0; i < 3; i++) {
// console.log({
//   photoSrc: ['https://loremflickr.com/320/240'],
//   bedsAndHouse: makeBedsAndHouseString(),
//   rating: `${getRandomArbitrary(3,5).toFixed(2)} (${getRandomInt(10, 10000)})`,
//   description: `${makeDescription()}`,
//   pricePerNight: `$${faker.commerce.price()}`
// })
// }

var schema = new mongoose.Schema({
  photoSrc: 'array', // strings of url locations
  bedsAndHouse: [], // 'string and possible number of beds'
  rating: 'array', // [number between 3-5 with 2 decimals for rating, integer less than 10k for # of strings]
  description: 'string',
  pricePerNight: 'string'
 });
var House = mongoose.model('House', schema);

let dataObj = {
  photoSrc: ['https://loremflickr.com/320/240'],
  bedsAndHouse: makeBedsAndHouseString(),
  rating: `${getRandomArbitrary(3,5)} (${getRandomInt(10, 10000)})`,
  description: `${makeDescription()}`,
  pricePerNight: `$${faker.commerce.price()}`
}

House.create(dataObj, function (err, small) {
  if (err) {throw (err);}
});

