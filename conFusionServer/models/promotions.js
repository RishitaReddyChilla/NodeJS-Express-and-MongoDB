const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    image:{
        type: String,
        required:true
    },
    label:{
        type: String,
        default:''
    },
    price:{
        type:Currency,
        required:true,
        min:0
    },
    description: {
        type: String,
        required: true
    },
    featured:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true
});

var Promotions = mongoose.model('Promotion',promotionSchema);//Mongoose atomatically names the collection as promotions (plural of Promotion) automatically using a built in mechanism

module.exports = Promotions;