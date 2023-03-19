const express = require ('express');
const router = express.Router();
const path = require ("path")

router.get("/about", (req,res)=>{
    res.sendFile(path.join(__dirname, "../Front-end/about.html"));
});

module.exports = router
