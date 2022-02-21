# conFusion server
1. Using express generator and modifying the application to support the REST API. <br/><br/>
2. __Integrate the REST API server with the backend__
     - Create a folder named `mongodb` and a subfolder named `data` at any location.
     - Navigate to `mongodb` folder on prompt and type<br/> `mongod --dbpath=data --bind_ip 127.0.0.1`<br/> to start the MongoDB server.<br><br/>
3. __HTTPS - secure communication__<br/>
     All the requests will be redirected to port `3443`. This will successfully run the application on https://localhost:3443. <br/>
     - Navigate to 'conFusionServer' folder on command prompt and type <br/>
          1. `openssl genrsa 1024 > private.key` to generate a private key <br/>
          2. `openssl req -new -key private.key -out cert.csr` and <br/>
          3. `openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem<` to generate a certificate.
<br/><br/>
5. __Using Postman__
- <u>__Use Postman to send requests and check responses.__</u>
   - Send  `GET`, `PUT`, `POST` or `DELETE` requests and check the response.
   - Perform `POST` on https://localhost:3443/dishes by giving the json data from `db.json` in the body.
   - Send the `GET` request and copy the `dishID`.
   - Send the  `GET` request on https://localhost:3443/dishes/dishID to check the response.<br/><br/>
 - <u>__Authentication - Passport JWT__</u>
  <br/>
     - <u>__To Signup__ </u><br/>
  Send `POST` request on https://localhost:3443/users/signup and under the body select the raw json format and include <br/> {<br/>"username":"Anyusername",<br/>"password":"Anypassword"<br/>} <br/> to register
  <br/><br/>
     - <u>__To Login__</u> <br/> 
     Send `POST` request on https://localhost:3443/users/login and under the body select the raw json format and include <br/> {<br/>"username":"username_used_to_signup",<br/>"password":"password_used_to_signup"<br/>} <br/> to login inorder to send `put`,`post` and `delete` requests.
     - Copy the `token` displayed in response
     - To perform any operation (`put`,`post` and `delete`) , under the `headers` add a row with `key` as `Authorization` and `value` as `token` which was copied earlier and include the json data under body while sending `post` and `put` requests.<br/><br/>
    -  <u>__Setting a user as admin__</u><br/>
     Users who are not admins cannot perform certain operations.<br/>
     a. Register (set the username as 'admin') and login (as shown above).<br/>
     b. Open command prompt and type the following commands.<br/>
      I.  `mongo`<br/>
     II. `use conFusion`<br/>
     III. `db.users.update("username":"admin"},{$set: {"admin":true}})`<br/>
     IV. To verify that admin field is set to true for 'admin' user. Type `db.users.find().pretty()`. and check the admin field.<br/><br/>

- <u>__To Upload files__<br/></u>
     Only Admin user can upload files.Therefore, login using the admin credentials (shown above)
     <br/> 
     a. Select the `POST` request and enter `https://localhost:3443/imageUpload`.<br/>
     b. Under `Body` select `form-data`.<br/>
     c. Under `key` column enter `imageFile`. Hover on the text box and select the `file` option from dropdown.<br/>
     d. Under the `value` column. Click on the `select Files` option and select the image that you would like to upload.

  