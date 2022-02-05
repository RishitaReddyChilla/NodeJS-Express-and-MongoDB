const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly to server");

    //create and save a new dish
    Dishes.create({
        name: 'Uthappizza',
        description: 'test',
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: { description: 'Updated test'}
        },{
            new:  true
        }).exec();
    })
    //printing the dish
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'

        });

        return dish.save();
    })
    .then((dish)=> {
        console.log(dish);
        return Dishes.deleteOne({});
    //closing the connection
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});

