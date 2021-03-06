const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "6047595a56997837d87c51ec", //your id must be here for seed the database
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus neque, mollis ac leo ac, semper ornare libero. Aliquam tempor",
      price: price,
      geometry: { 
        type: 'Point', 
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      //2 image added to camgpround
      images: [
        {
          url: 'https://res.cloudinary.com/reymir/image/upload/v1614973474/YelpCamp/ehqlsxjmoppphihntudj.jpg',
          filename: 'YelpCamp/ehqlsxjmoppphihntudj'
        },
        {
          url: 'https://res.cloudinary.com/reymir/image/upload/v1614973482/YelpCamp/bgqkrzzh8eyaltkzu5y7.jpg',
          filename: 'YelpCamp/bgqkrzzh8eyaltkzu5y7'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});