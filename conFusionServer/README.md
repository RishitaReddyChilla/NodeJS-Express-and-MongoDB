# conFusion server
 - Using express generator and modifying the application to support the REST API.
 -  Integrate the REST API server with the backend
     - Create a folder named `mongodb` and a subfolder named `data` at any location.
     - Navigate to `mongodb` folder on prompt and type<br/> `mongod --dbpath=data --bind_ip 127.0.0.1`<br/> to start the MongoDB server.
- Use Postman to send requests and check responses.
   - Send  `GET`, `PUT`, `POST` or `DELETE` requests and check the response.
   - Perform `POST` on https://localhost:3443/dishes by giving the json data from `db.json` in the body.
   - Send the `GET` request and copy the `dishID`.
   - Send the  `GET` request on https://localhost:3443/dishes/dishID to check the response.
 - Authentication - Passport JWT
     - Use Postman to send `POST` request on https://localhost:3443/users/signup and under the body select the raw json format and include <br/> {<br/>"username":"Anyusername",<br/>"password":"Anypassword"<br/>} <br/> to register
     - Send `POST` request on https://localhost:3443/users/login and under the body select the raw json format and include <br/> {<br/>"username":"username_used_to_signup",<br/>"password":"password_used_to_signup"<br/>} <br/> to login inorder to send `put`,`post` and `delete` requests.
     - Copy the `token` displayed in response
     - To perform any operation (`put`,`post` and `delete`) , under the `headers` add a row with `key` as `Authorization` and `value` as `token` which was copied earlier and include the json data under body while sending `post` and `put` requests.
- HTTPS - secure communication<br/>
All the requests will be redirected to port `3443`. This will successfully run the application on https://localhost:3443 . 
     - Navigate to 'conFusionServer' folder on command prompt and type <br/>
      1. `openssl genrsa 1024 > private.key` to generate a private key <br/>
      2. `openssl req -new -key private.key -out cert.csr` and <br/>
      3. `openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem<` to generate a certificate.
  