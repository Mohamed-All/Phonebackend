const mongoose = require('mongoose');


const accessoriesSchema = new mongoose.Schema({
    name: String,
    brand:String,
    price:String,
    warranty: String,
    PriceBeforeOffer: String,
    description: String,
    model : String ,
    type : String,
    img: [{ type: String, required: true }]
});


module.exports.accessories = mongoose.model('accessories', accessoriesSchema);
