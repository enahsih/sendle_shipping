
//mongoose requirement---------------------------
const mongoose = require ("mongoose");

const  ShipmentSchema = new mongoose.Schema({
    Title:String,
    Author:String,

    Shipper:String,
    ShPhone:Number,
    shAdd:String,
    shmail:String,

    Rec:String,
    recPhone:Number,
    recAdd:String,
    recmail:String,
    
    Agent_Name:String,
    Type_of_shipment:String,
    Courier:String,
    Mode:String,
    Quantity:Number,
    Total_Freight:Number,
    CRN:Number,
    Origin:String,
    POD:String,
    EDD:String,
    Weight:Number,
    Packages:Number,
    Product:String,
    Payment:String,
    Carrier:String,
    Departure_time:String,
    Destination:String,
    Pickup_time:String,
    Comments:String,

    SDate:String,
    STime:String,
    Status:String,
    Location:String,
    Remarks:String
});

module.exports = mongoose.model("Shipment", ShipmentSchema);









