//use / create database
use masterdb;

// prinf current database
db

// list databases
show dbs

// drop database
db.dropDatabase();

// create collection
db.createCollection("product", { capped : true, size : 50 * 1024 * 1024, max : 100 * 1000 } );

//drop databases
db.product.drop();


//default id size is 12 bytes
//4bytes timestamp, 3bytes machine id, 2bytes process id, 3 bytes incrementer


//inseret the document
db.product.insert([{"productCode":1,"productName":"Apple","active":"Y"}]);
db.product.insert([{"_id":"5accbc81d5e03828846c6973","productCode":2,"productName":"Big Orange","active":"N"}]);
db.product.save({"_id":"5accbc81d5e03828846c6973","productCode":2,"productName":"Big Orange","active":"N"});
db.product.insert({"productCode":2,"productName":"Big Orange","active":"N"});
// insert can used to insert new document, id the id already exists then it will throw error
//using inser we can insert array of documents
// save can used to update old document when if  already exists or else it will insert the document
//using save we can't insert array of documents


// find the document
db.product.find({}).pretty();

//where clase
db.product.find({"active":"N"}).pretty();
db.product.find({"productCode": { $lt : 1}}).pretty();
db.product.find({"productCode": { $lte : 1}}).pretty();
db.product.find({"productCode": { $gt : 1}}).pretty();
db.product.find({"productCode": { $gte : 1}}).pretty();
db.product.find({"productCode": { $ne : 1}}).pretty();

// and  condition
db.product.find({$and: [
    {"active": "Y"},
    {"active": "N"}
    ]});

// or  condition
db.product.find({$or: [
    {"active": "Y"},
    {"active": "N"}
    ]});

// AND and OR together
db.product.find({"productCode": {$gt : 1},$or:[
    {"active":"Y"},
    {"active":"N"}] });


//update method
//update will allow where clause criteria, based on that it will update if criteria not present mean it will insert the document based on upsert value
// upsert : false : Nothing happens when no such document exist
// upsert : true : New doc gets created with contents equal to query params and update 
db.product.update({"_id":"5accbc81d5e03828846c6973"},{$set:{"active":"Y"}});
// with {multi:true} we can insert multiple documents
db.product.update({"active":"N"},{$set:{"active":"Y"}},{multi:true});

//delste one document
db.product.deleteOne({"active":"Y"});

//delete many document
db.product.deleteMany({"_id":"5accbc81d5e03828846c6973"});

//remove all the document
db.product.remove({});

//find all
db.product.find({});

//projection
db.product.find({},{"productCode":1,"productName":1,"_id":0});

// limit the records count to display
db.product.find({},{"productCode":1,"productName":1,"_id":0}).limit(1);

// skip the no of records from display
db.product.find({},{"productCode":1,"productName":1,"_id":0}).skip(1);


//shorting
//decending shorting order by product code
db.product.find({}).sort({ productCode:-1 });
//ascending shorting order by product code
db.product.find({}).sort({ productCode:1 });

// collection index creation with name and background process
//we can create index by multiple options like background, unique, 
db.product.ensureIndex({"productCode":1},{background:true,name:"productCode_index"});
//drop the collection index
db.product.dropIndex("productCode_index");

// drop the collection
db.product.drop();

//aggregation

//we need to provide key field and aggregate function name
// $sum, $avg, $min, $max, $push, $addToSet, $first, $last
db.product.aggregate({$group: {"_id":"$active","num_active": {$sum: 1} }});
      //.match(qb.where("status").eq("A"))
      //.project("gender _id")
      //.unwind("$arrayField")
      //.group({ _id: "$gender", count: { $sum: 1 } })
      //.sort("-count")
      //.limit(5)
      
db.product.aggregate({$group: {_id:"$active","num_act_inact":{$sum: 1}}});
      //.match(qb.where("status").eq("A"))
      //.project("gender _id")
      //.unwind("$arrayField")
      //.group({ _id: "$gender", count: { $sum: 1 } })
      //.sort("-count")
      //.limit(5)

 
//aggregation pipeline are commented below
db.product.aggregate()
      //.match(qb.where("status").eq("A"))
      //.project("gender _id")
      //.unwind("$arrayField")
      //.group({ _id: "$gender", count: { $sum: 1 } })
      //.sort("-count")
      //.limit(5)
   
   
      
//replication setup syntax
//mongod --port "PORT" --dbpath "YOUR_DB_DATA_PATH" --replSet "REPLICA_SET_INSTANCE_NAME"

//when mongo db server startup time provide this command to start
// mongod --port 27017 --dbpath "D:\set up\mongodb\data" --replSet rs0

// get the host name
getHostName()      

// we can find the mongodb host name in terminal when mongod.exe starts time
db.getMongo().get
     
// check it is primary node
db.isMaster();
      
// add the host to replica server
// to add replica we need to be connected into primary node
rs.add("CHD117567:27017");


// to backup the show databases
//run below command exe it will take all the database backup and stored it into /bin/backup directory
// mongodump

// for only specified collection or db
// mongodump --collection COLLECTION --db DB_NAME	

//to change the db backup path
// mongodump --dbpath DB_PATH --out BACKUP_DIRECTORY

//take backup of specified instance
// mongodump --host HOST_NAME --port PORT_NUMBER

// to restore the backup data run below command
// mongorestore



// mongo db deployment

// checks the status of all running mongod instances
//mongostat

// it will return read and write status of mongodb instance on a collection basics status will  every 30 seconds
// mongotop <time in millies second

// ADVANCED CONCPTS
// ================

// MongoDB - Relationships
// Relationships in MongoDB represent how various documents are logically related to each other. Relationships can be modeled via Embedded and Referenced approaches. Such relationships can be either 1:1, 1:N, N:1 or N:N.
// Modeling Embedded Relationships
// {
//   "_id":ObjectId("52ffc33cd85242f436000001"),
//   "contact": "987654321",
//   "dob": "01-01-1991",
//   "name": "Tom Benzamin",
//   "address": [
//       {
//          "building": "22 A, Indiana Apt",
//          "pincode": 123456,
//          "city": "Los Angeles",
//          "state": "California"
//       },
//       {
//          "building": "170 A, Acropolis Apt",
//          "pincode": 456789,
//          "city": "Chicago",
//          "state": "Illinois"
//       }
//   ]
// } 
// >db.users.findOne({"name":"Tom Benzamin"},{"address":1})

// Modeling Referenced Relationships
// {
//   "_id":ObjectId("52ffc33cd85242f436000001"),
//   "contact": "987654321",
//   "dob": "01-01-1991",
//   "name": "Tom Benzamin",
//   "address_ids": [
//       ObjectId("52ffc4a5d85242602e000000"),
//       ObjectId("52ffc4a5d85242602e000001")
//   ]
// }
// >var result = db.users.findOne({"name":"Tom Benzamin"},{"address_ids":1})
// >var addresses = db.address.find({"_id":{"$in":result["address_ids"]}})


// Using DBRefs
// There are three fields in DBRefs −
// $ref − This field specifies the collection of the referenced document
// $id − This field specifies the _id field of the referenced document
// $db − This is an optional field and contains the name of the database in which the referenced document lies
//-- Manual References in which we manually store the referenced document's id inside other document. 

// What is a Covered Query?
// As per the official MongoDB documentation, a covered query is a query in which −
// All the fields in the query are part of an index.
// All the fields returned in the query are in the same index.


//explain query used to explain the query execution
db.product.find({}).explain();

//The $hint operator forces the query optimizer to use the specified index to run a query. 
db.product.find({}).hint({productCode:1})


// can create index for sub documents
