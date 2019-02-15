const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    product_name:{
        type:String
    },
    product_price:{
        type:String
    },
    product_status:{
        type:String
    },
    product_posted_by:{
        type:String
    }

});


module.exports = mongoose.model('Product', Product);