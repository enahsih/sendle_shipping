const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const flash = require("connect-flash")
const session = require("express-session");
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureAuthenticated} = require('../config/auth');

//shipment and history models
const Shipment = require("../Models/shipment.model")
const History = require('../Models/historytable.model');
const User = require("../Models/users.model");

//passport config
require("../passport-config")(passport);

//bodyparser middleware;
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//middleware for express sesion
router.use(session({
    secret:'Mysecretisverytopnotch',
    resave:false,
    saveUninitialized:false
})),

//passport middleware
router.use(passport.initialize());
router.use(passport.session());

//middleware for flash
router.use(flash());

//Global vars for flash
router.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
    next()
})


//Hashpassword*******************************************************************************
/*bcrypt.genSalt(10, (err, salt) => bcrypt.hash('Sendle1909@', salt, (err, hash)=>{
    if (err) throw error;
    const hashedPassword = hash;

    const user = new User();
    user.Email = 'sendlelogistics@outlook.fr';
    user.Password = hashedPassword;
    user.save().then();
}))*/


//login router
router.get('/sadmin/create', ensureAuthenticated, (req, res) => {
    res.render('create', {functionality: "Publish", role:"Book", update:''});

});


router.get('/sadmin', (req, res) =>{
    res.render('login');
})



//managine//Obtaining the post request data from the form
router.post('/sadmin/create', (req, res) => {

 const  shipment = new Shipment ();


    if (req.body._id == ''){
           
        //configuring the various values for the shipment profile-------------;
        shipment.Title = req.body.title,
        shipment.Author = req.body.author,
        shipment.Shipper = req.body.shname,
        shipment.ShPhone = req.body.shphone,
        shipment.shAdd = req.body.shadd,
        shipment.shmail = req.body.shmail,
    
        shipment.Rec = req.body.recname,
        shipment.recPhone = req.body.recphone,
        shipment.recAdd = req.body.recadd,
        shipment.recmail = req.body.recmail,
    
        shipment.Agent_Name = req.body.agent,
        shipment.Type_of_shipment = req.body.tos,
        shipment.Courier = req.body.courier,
        shipment.Mode = req.body.mode,
        shipment.Quantity = req.body.quantity,
        shipment.Total_Freight = req.body.totalfreight,
        shipment.CRN = req.body.CRN,
        shipment.Origin = req.body.origin,
        shipment.POD = req.body.POD,
        shipment.EDD = req.body.EDD,
        shipment.Weight = req.body.weight,
        shipment.Packages = req.body.packages,
        shipment.Product = req.body.product,
        shipment.Payment = req.body.paymode,
        shipment.Carrier = req.body.carrier,
        shipment.Departure_time = req.body.DT,
        shipment.Destination = req.body.destination,
        shipment.Pickup_time = req.body.PT,
        shipment.Comments = req.body.comments,
    
        shipment.SDate = req.body.Status_date,
        shipment.STime = req.body.Status_time,
        shipment.Status = req.body.status,
        shipment.Location =req.body.location,
        shipment.Remarks = req.body.remark

    
        shipment.save((err, doc)=>{
            console.log(doc);
            if(!err){
                console.log('saved to database')
            }
    
            else {
                console.log('Error during record insertion:' + err)
            }
        })
    
        res.redirect('/sadmin/list');
       
        //adding data into the history model
        history = new History({Title:req.body.title, Date:req.body.Status_date, Time:req.body.Status_time, Location:req.body.location, Status:req.body.status, Updated_by:req.body.agent, Remarks:req.body.remark})
        history.save();
    }

    //updating step
    else {
        updateRecord(req, res)
     }


})


//update record function------------------------------------------------------
    function updateRecord(req, res){
        //implementing the geocoder

     Shipment.findByIdAndUpdate({_id:req.body._id},

        {Title:req.body.title,
        Author:req.body.author,
        Shipper:req.body.shname,
        ShPhone:req.body.shphone,
        shAdd:req.body.shadd,
        shmail:req.body.shmail,
        Rec:req.body.recname,
        recPhone:req.body.recphone,
        recAdd:req.body.recadd,
        recmail:req.body.recmail,
        Agent_Name:req.body.agent,
        //Type_of_shipment:req.body.tos,
        Courier:req.body.courier,
        //Mode:req.body.mode,
        Quantity:req.body.quantity,
        Total_Freight:req.body.totalfreight,
        CRN:req.body.CRN,
        Origin:req.body.origin,
        POD:req.body.POD,
        EDD:req.body.EDD,
        Weight:req.body.weight,
        Packages:req.body.packages,
        Product:req.body.product,
        //Payment:req.body.paymode,
        //Carrier:req.body.carrier,
        Departure_time:req.body.DT,
        Destination:req.body.destination,
        Pickup_time:req.body.PT,
        Comments:req.body.comments,
        SDate:req.body.Status_date,
        STime:req.body.Status_time,
        Location:req.body.location,
        Status:req.body.status,
        Remarks:req.body.remark

        },        {new:true},   (err, doc) =>{

                                                console.log(req.body);
                                                console.log(doc)
                                                if(!err)
                                                    res.redirect('/sadmin/list');

                                            else{
                                                console.log('Error while Updating Document');
                                                    }
                                        }
     )

     //adding data into the history model
     history = new History({Title:req.body.title, Date:req.body.Status_date, Time:req.body.Status_time, Location:req.body.location, Status:req.body.status, Updated_by:req.body.agent, Remarks:req.body.remark})
     history.save();

        };

        ///showing the list items ---------------------------------------------------
    
    router.get('/sadmin/list', ensureAuthenticated, (req,res) =>{
        Shipment.find((err, docs) => {
            if (!err){
                res.render('list', {list:docs});
            }
            else {
                console.log('Error in retrieving Shipment list :' + err);
            }
        });
    })

    //updating shipments
    router.get('/sadmin/edit/:id', ensureAuthenticated,  (req, res)=>{
        Shipment.findById(req.params.id, (err, doc, next) => {
            if (!err) {
                res.render('create', {functionality:"Update", role:"Update", update:doc});
            }
        })
    })

    //deleting records-----------------------------------------------
    router.get('/sadmin/delete/:id', ensureAuthenticated, (req, res) =>{
        Shipment.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err){
                res.redirect('/sadmin/list')
            }
            else{
                console.log("Failure to delete record from list" + err)
            }
        })

    })


    //login router
    router.post('/sadmin/login', (req, res, next) =>{
        passport.authenticate('local', {
            successRedirect:'/sadmin/create',
            failureRedirect:'/sadmin',
            failureFlash:true
        }) (req, res, next);

    })


    //logout handle
   router.get('/sadmin/logout', (req, res) =>{
        req.logout(function(err){
            if(err){return next(err);}
            res.redirect('/sadmin');
        });
       
})

module.exports = router;