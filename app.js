const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path =  require("path");
const methodOverride =  require("method-override");
const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() =>{
    console.log("connected to db");
}).catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res)=>{
    res.send("hi ,i am root");
});


//index Route
app.get("/listings", wrapAsync( async(req, res)=>{
   
   const allListing= await Listing.find({});
   res.render("listings/index.ejs", {allListing});
}));


//New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs" );
});


//show route
 app.get("/listings/:id", wrapAsync( async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
 }));


 //create route
 app.post("/listings", wrapAsync( async(req, res, next) =>{
  console.log(req. body);
  if(!req.body.listing){
    throw new ExpressError(400," send vailid data fir listing");

  }
  const newListing = new Listing(req.body.listing);
  //if(!newListing.title){
  //  throw new ExpressError(400," Title is missing!!");
  //}
  //if(!newListing.description){
  //  throw new ExpressError(400," Description is missing!!");
  //}
 // if(!newListing.location){
 //   throw new ExpressError(400," location is missing!!");
 // }
   await newListing.save();
   res.redirect("/listings");
  
 })
);


 //edit route
 app.get("/listings/:id/edit", wrapAsync( async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
 }));

 //Update route

 app.put("/listings/:id", wrapAsync( async(req,res) =>{
    if(!req.body.listing){
        throw new ExpressError(400," send vailid data fir listing");
      }
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id, {...req.body.listing});
   res.redirect(`/listings/${id}`);
 }));


 //delete
  app.delete("/listings/:id",  wrapAsync (async(req,res)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }));

//app.get("/testListing", async(req, res)=>{
//    let sampleListings= new Listing({
//        title: "My New villa",
//       description: "by the form",
//        price:1000,
//        location: "jabalpur",
//       country: "India",
// });

//   await sampleListings.save();
// console.log("sample was saved");
// res.send("successfull testing");
//});

app.all("*", (req,res,next)=>{
    next( new ExpressError(404, "Page not found!"));
    

});

app.use((err, req, res, next)=>{

let{statusCode= 500, message= "something went wrong!"} = err;
res.status(statusCode).render("error.ejs", {err});
console.log(err);
//res.status(statusCode).send(message);

});

app.listen(8000, () => {
    console.log("server is listening port: 8000")
});