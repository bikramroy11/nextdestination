const mongoose=require("mongoose");
const { type } = require("os");
const { ref } = require("process");
const Schema= mongoose.Schema;
const Review=require("./review");
const { required } = require("joi");

const listingSchema= new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        url: String,
        filename: String,
    },
    price:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required: true,
        },
        coordinates:{
            type:[Number],
            required: true,
        }
    },
    category: {
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Beaches", "Castles", "Pools"],
        required: true
    },
});


//handle reviews after delete listings
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing= mongoose.model("Listing", listingSchema);
module.exports=Listing;