const express = require ('express');
const router = express.Router();
const path = require ("path");


router.get("/track", (req,res)=>{
    res.sendFile(path.join(__dirname, "../Front-end/track.html"))
});

module.exports = router