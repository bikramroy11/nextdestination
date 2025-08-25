const mongoose=require("mongoose");
const initData=require("./data"); //sample data
const Listing=require("../models/listing"); //model

main().then(()=> {
    console.log("connected to db nextdestination");
}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/nextdestination');
}


const initDB = async () => {
  await Listing.deleteMany({});

  // Example categories you want to assign randomly or fixed
  const categories = [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Beaches",
    "Castles",
    "Pools",
  ];

  // attach owner + category
  initData.data = initData.data.map((obj) => {
    return {
      ...obj,
      owner: "68a87c43306f914d0ea03cd7",
      category: categories[Math.floor(Math.random() * categories.length)], // random category
      geometry: {
        type: "Point",
        coordinates: [74.0060, 40.7128] // dummy lat/lng
      }
    };
  });

  await Listing.insertMany(initData.data);
  console.log("data is initialized to db with category");
};

initDB();