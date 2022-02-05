const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);//Mongoose atomatically names the collection as dishes (plural of Dish) automatically using a built in mechanism

module.exports = Dishes;