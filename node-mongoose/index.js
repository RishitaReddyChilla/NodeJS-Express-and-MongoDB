const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected correctly to server");

    //create a new dish
    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    //saving the dish
    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
        //printing the dish
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        //closing the connection
        .then(()=>{
            return mongoose.connection.close();
        })

        .catch((err) => {
            console.log(err);
        });
});

