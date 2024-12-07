const mongoose = require('mongoose');


const iphoneSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: String,
    processor: String,
    storage: String,
    ram: String,
    display: String,
    battary: String,
    operation: String,
    frontCamera: String,
    backCamera: String,
    bodyStyle: String,
    battaryLife: String,
    dualSim: String,
    waterProof: String,
    location: String,
    wirlessCharging: String,
    warranty: String,
    PriceBeforeOffer: String,
    model : String ,
    description: String,
    type : String,
    img: [{ type: String, required: true }] 
});

module.exports = mongoose.model('iPhone', iphoneSchema);

