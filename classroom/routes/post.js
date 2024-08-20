const express = require("express");
const router = express.Router();


//POSTs
//Index
router.get("/",(req,res)=>{
    res.send("POST for post");
});

//Show
router.get("/:id",(req,res)=>{
    res.send("GET for post id");
});

//POST 
router.get("/",(req,res)=>{
    res.send("POST for posts");
});

//DELETE 
router.get("/:id",(req,res)=>{
    res.send("Delete for post id");
});

module.exports = router;