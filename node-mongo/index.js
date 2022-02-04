const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//to access server
MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null); //check if error is null

    console.log('Connected correctly to server');//no error

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({
        "name": "Uthappizza",
        "description": ""
    },
    (err,result) => {

        assert.equal(err,null);
        console.log('After Insert:\n');
        console.log(result.ops); //ops - how many operations are carried out succesfully

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes',(err,result) => {

                assert.equal(err,null);
                client.close();

            });
        });
    });

});