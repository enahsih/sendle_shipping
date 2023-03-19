
//mongoose requirement---------------------------
const mongoose = require ("mongoose");

const  HistorySchema = new mongoose.Schema({
    Title:String,
    Date:String,
    Time:String,
    Location:String,
    Status:String,
    Updated_by:String,
    Remarks:String,

});
module.exports = mongoose.model("History", HistorySchema);









