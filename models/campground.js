const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

//https://res.cloudinary.com/reymir/image/upload/w_100/v1614976776/YelpCamp/p9tyibl94ajsz5eqz8zr.jpg

const ImageSchema = new Schema({
    url: String,
    filename: String
})

//dont need to store in database
ImageSchema.virtual("thumbnail").get(function(){
  return this.url.replace("/upload","/upload/w_200");
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User" 
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review"
      }
    ]
});

CampgroundSchema.post("findOneAndDelete", async function(doc){
  if(doc){
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
});

module.exports = mongoose.model("Campground",CampgroundSchema);