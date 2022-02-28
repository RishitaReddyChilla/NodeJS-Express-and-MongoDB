# conFusion server
1. __Using express generator and modifying the application to support the REST API.__ <br/><br/>
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
4. __Setting up OAuth based authentication with Facebook__
  - Visit https://developers.facebook.com/docs/development/create-an-app/ and follow the steps to create an app.<br/> (Note: You must have a facebook account).
  - Navigate to settings>Basic and note the **APP ID** and **App secret**. Scroll down and click on **Add platform**. Select **Website** from the Options displayed. Now, enter the URL https://localhost:3443 in the text box displayed for **site URL** and save the changes.
  - Navigate to settings>Advanced and **enable** 'Native or desktop App?' and save the changes.
  - Navigate to settings>Basic and enter  https://localhost:3443 under **App domains** and save the changes.
  - Open config.js file and modify <br/>
    `clientId: 'Your App ID code'` and <br/>
    `clientSecret: 'Your App secret code'`
  -  Navigate to public>index.html file and modify <br/>
    `appId: 'Your App ID code'`
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
  - <u>__To Login__</u> (without OAuth based authentication)<br/>
     Send `POST` request on https://localhost:3443/users/login and under the body select the raw json format and include <br/>
     {<br/>"username":"username_used_to_signup",<br/>"password":"password_used_to_signup"<br/>} <br/> to login inorder to send `put`,`post` and `delete` requests.
  - <u>__To Login__</u> (OAuth based authentication with Facebook)<br/>
     a. Go to web browser and type https://localhost:3443/index.html .Click on the facebook icon displayed and login to your facebook account.<br/>
     b. Once you are successfully loggedin. Right click on the webpage>inspect>console. Navigate to Object>authResponse>accessToken. and copy the `access Token`.<br/>
     c. Open Postman. There are three methods to get the JSON web token using the facebook access token received after verifying the user.
     <br/>
     >__1st method__ - Select GET request on https://localhost:3443/users/facebook/token and under the headers mention the <br/>
     key as `Authorization` and <br/>
     value as `Bearer YOUR_ACCESS_TOKEN` <br/>

     > __2nd method__ - Select GET request on https://localhost:3443/users/facebook/token and under the headers mention the <br/>
     key as `access_token` and <br/>
     value as `YOUR_ACCESS_TOKEN` <br/>

     > __3rd method__ - Select GET request on https://localhost:3443/users/facebook/token?access_token=`YOUR_ACCESS_TOKEN`.
  - Copy the `token` displayed in response
  - To perform any operation (`put`,`post` and `delete`) , under the `headers` add a row with `key` as `Authorization` and `value` as `token` which was copied earlier and include the json data under body while sending `post` and `put` requests.<br/><br/>
   
  - <u>__Setting a user as admin__</u><br/>
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

  