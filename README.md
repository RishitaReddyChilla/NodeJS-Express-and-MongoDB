# NodeJS
Server-side Development with NodeJS, Express and MongoDB by Hong Kong University of Science and Technology.
# Installation
Install [NodeJS](https://nodejs.org).
<br/>
Install [Postman](http://getpostman.com).
<br/>
Install [MongoDB](http://www.mongodb.org).
<br/>
To Verify node installation type `node -v` at the prompt
<br/>

# Run
To run the node application type `npm start` at the prompt

# node-examples 
Node Callbacks and Error Handling

# node-http
Simple HTTP server
### To check the result
1. Type  http://localhost:3000 in the browser to see the result.
2. Use Postman to send requests and check responses.
   - Send a  `GET` request and check the response by typing <br/> http://localhost:3000 or <br/> http://localhost:3000/index.html or <br/> http://localhost:3000/aboutus.html <br/>
  
# node-express
Using Express Router in Express framework to support REST API

### To check the result
1. Type  http://localhost:3000/dishes in the browser to see the result.
2. Use Postman to send requests and check responses.
   - Send  `GET`, `PUT`, `POST` or `DELETE` requests and check the response by typing<br/>http://localhost:3000/dishes and <br/> http://localhost:3000/dishes/number (localhost:3000/dishes/10)

# conFusion server
 Using express generator and modifying the application to support the REST API.

# node-mongo
Connect to server, insert document (json) , find document, update document and drop collection using promises to avoid callback.

1. Create a folder named `mongodb` and a subfolder named `data` at any location.
2. Navigate to `mongodb` folder on prompt and type<br/> `mongod --dbpath=data --bind_ip 127.0.0.1`<br/> to start the MongoDB server.

   <!--3. On another command prompt window type `mongo`-->
# node-mongoose
Creating mongoose schemas and performing Database operations with Mongoose methods.
