// const db = require('db');
const faker = require('faker')
const mongoose = require('mongoose')
const util = require('util')

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


var schema = new mongoose.Schema({
  houseItem: {type: 'number', unique: true},
  relatedHouses: [{
    photoSrc: 'string', // strings of url locations
    bedsAndHouse: 'string', // 'string and possible number of beds'
    rating: 'string', // [number between 3-5 with 2 decimals for rating, integer less than 10k for # of strings]
    description: 'string',
    pricePerNight: 'string'
  }]
});

var House = mongoose.model('House', schema);
 let photoSrcArray = ['https://loremflickr.com/320/240']

class houseObj {
  constructor () {
  this.photoSrc = 'https://loremflickr.com/320/240',
  this.bedsAndHouse = makeBedsAndHouseString(),
  this.rating = `${getRandomArbitrary(3,5).toFixed(2)} (${getRandomInt(10, 10000)})`,
  this.description = `${makeDescription()}`,
  this.pricePerNight = `$${faker.commerce.price()}`
  }
}

let houseItemMaker = (numberOfObjects) => {
  let array = [];
  for (var i = 1; i <= numberOfObjects; i++) {
    let relatedHouseArray = [];
    let relatedHouseMaker = () => {
      for (var j = 0; j < 8; j++) {
        relatedHouseArray.push(new houseObj)
      }
    }
    relatedHouseMaker();
    let houseItem = {
      houseItem: i,
      relatedHouses: relatedHouseArray
    }
    array.push(houseItem)
  }
  return array;
}


const allHousesArray = houseItemMaker(10)

console.log('allHousesArray: ', util.inspect(allHousesArray, { showHidden: true, depth: null }));


for(var k = 1; k <= 10; k++) {
House.create(allHousesArray, function (err, small) {
  if (err) {throw (err);}
});
}

// mongoose.connection.close()