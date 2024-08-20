const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, ValidateListing }= require("../middlware.js");

const listingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }) 


const { x } = require("joi");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn ,  upload.single('listing[image]'),ValidateListing, wrapAsync(listingController.createListing)
  
);

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner, upload.single('listing[image]'), ValidateListing, wrapAsync(listingController.updatelisting)
  )
  .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListings)
  );

  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,   wrapAsync(listingController.renderEditForm)
  );
  

  


  module.exports = router;
  