const express = require ('express');
const router = express.Router();
const path = require ("path");


router.get("/service", (req,res)=>{
    res.sendFile(path.join(__dirname, "../Front-end/service.html"))
});

module.exports = router