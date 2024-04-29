const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {  
       type: String,
       required: true,
    },
    description : String,
    image :{
        type: String,
        default:"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        
    },
    price: Number,
    location:String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
