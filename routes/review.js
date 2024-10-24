const express =require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");


//Post  review rout
router.post("/",
isLoggedIn, validateReview, 
wrapAsync(reviewController.createReview));

//delete Review Rout
router.delete("/:reviewId",
isLoggedIn, isReviewAuthor,
wrapAsync (reviewController.deleteReview));

module.exports = router;
  