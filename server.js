//require('dotenv').config();

//jshint esversion:6;
//requiring the various path modells---------------------------
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require ("nodemailer");
const mongoose = require ('mongoose');
const ejs = require('ejs');


//various rouutes
const homerouter = require ("./routes/index.router");
const contactrouter = require ("./routes/contact.router");
const aboutrouter = require ("./routes/about.router");
const servicerouter = require("./routes/service.router");
const trackrouter = require ("./routes/track.router");


//controllers -----------------------------------------
const createController = require('./Controller/create.controller');

//shipment and history models
const Shipment = require('./Models/shipment.model');
const History = require("./Models/historytable.model")

//creation of the port variable and mongoose---------------------------------
const MONGO_URL = 'mongodb://127.0.0.1:27017/ShipmentDB'
const PORT = process.env.PORT || 11419;

//express-app variable-------------------------------------
const app = express();


//using the controllers-------------------------------------
app.use(createController);

//setting the ejs-------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//using static files to render the html files
app.use(express.static(path.join(__dirname, "/Public")));


//using the various routes in the project**************************************************
app.use(homerouter);
app.use(contactrouter);
app.use(aboutrouter);
app.use(servicerouter);
app.use(trackrouter);


//bodyparser middleware;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//gettting post request form the contact form***************************************************
app.post("/contact", (req,res) => {
    
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'akwomih1@gmail.com',
            pass:'ontgandaltrgrcdj'
        }
    })

    const mailOptions = {
        from: `Sendle logistics customer ${req.body.email}`,
        to:"akwomih1@gmail.com",
        subject:`${req.body.subject}`,
        replyTo:`${req.body.email}`,
        text:req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send(error);
        }
        else{
            res.redirect("/contact");
        }
    })
})


//connection to the database using mongoose*****************************
const run = async () => {
    const connection = await mongoose.connect(MONGO_URL,{
        useNewUrlParser:true, 
    })  
};
run();




//setting up the tracking page result----------------------------------------------
app.post('/track', (req,res)=>{
    Shipment.find({Title:req.body.trackingCode}, (err, docs) =>{
        if (!err){
            if(docs.length == 0){
                res.redirect('/track')
            }
            else{
                History.find({Title:req.body.trackingCode}, (err, docs2)=> {
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.render('track', {list:docs, list2:docs2})
                    }
                })
            }
        }
        else{
            res.redirect('/track');
        }
    })


})

//from the homepage

app.post('/', (req,res)=>{
    Shipment.find({Title:req.body.trackingCode}, (err, docs) =>{
        if (!err){
            if(docs.length == 0){
                res.redirect('/')
            }
            else{
                History.find({Title:req.body.trackingCode}, (err, docs2)=> {
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.render('track', {list:docs, list2:docs2})
                    }
                })
            }
        }
        else{
            res.redirect('/');
        }
    })


})



//Listening on port 5000----------------------------
app.listen(PORT, '127.0.0.01' function(){
    console.log("Listening listening on port 11419...")
    
})




