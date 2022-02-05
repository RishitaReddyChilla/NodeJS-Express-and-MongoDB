const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
},
{
    timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);//Mongoose atomatically names the collection as dishes (plural of Dish) automatically using a built in mechanism

module.exports = Dishes;