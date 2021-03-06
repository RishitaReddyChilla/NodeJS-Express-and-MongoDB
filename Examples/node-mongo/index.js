const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';


MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then(async(result) => {
            const Id1 = result.insertedId;
            const Result =await db.collection('dishes').findOne({ _id: Id1 });
            console.log('Insert Document:\n', Result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));
/*
//to access server --------- Callback Hell Problem occurs

MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null); //check if error is null

    console.log('Connected correctly to server');//no error

    const db = client.db(dbname);

    const collection = db.collection('dishes');

    dboper.insertDocument(db,{name: 'Vadonut', description: 'Test'}, 'dishes' , async (result) => {
        const Id1 = result.insertedId;
        const Result =await db.collection('dishes').findOne({ _id: Id1 });
        console.log('Insert Document:\n', Result);

        dboper.findDocuments(db,'dishes', (docs) =>{

            console.log('Found Documents:\n',docs);

            dboper.updateDocument(db,{name:'Vadonut'}, {description: 'Updated Test'},'dishes',(result) =>{

                console.log('Updated Document:\n',result);

                dboper.findDocuments(db,'dishes',(docs) => {

                    console.log("Found Updated Documents:\n", docs);

                    db.dropCollection('dishes',(err, result)=>{
                        //assert.equal(err,null);
                        console.log("Dropped Collection: ", result);
                        client.close();
                    });
                });


            });
        });
    });

});

*/


/*
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
*/