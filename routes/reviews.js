const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn} = require("../middleware.js");

router.post("/", isLoggedIn, validateReview,catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn,catchAsync(reviews.deleteReview));

module.exports = router;