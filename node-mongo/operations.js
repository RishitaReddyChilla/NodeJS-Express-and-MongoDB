const assert = require('assert');

exports.insertDocument = (db, document, collection, callback ) =>{
    const coll = db.collection(collection);
    
    coll.insertOne(document, (err, result) => {
        assert.equal(err, null);
        //result - a property of result
        //n- property that tells how many documents are inserted
        console.log("Inserted " + result.insertedCount + 
            " documents into the collection " + collection);
        callback(result);//passing result back to callback function
    });
};

exports.findDocuments = (db,collection,callback) => {
    const coll = db.collection(collection);
    //{} - empty java script object to match with all the documents in the collection
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        callback(docs);  //passing back the retrieved documents to calling function      
    });

};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Removed the document ", document);
        callback(result);        
    });

};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    // { $set: update } - to pass the fields of the document that have to be updated
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result);        
    });

};
