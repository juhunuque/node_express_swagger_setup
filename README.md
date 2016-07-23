# Implement Swagger for existing Express-NodeJs projects and not die trying

## Intro
Let's get start explaining what is [Swagger](http://swagger.io/) and how we can use it.
### Swagger, what is it?

![Swagger Logo] (https://avatars2.githubusercontent.com/u/7658037?v=3&s=400 "Swagger Logo")

Let's suppose we have to start to write a new server side as part of a freelance project, let's say a simple web API with some few endpoints.
Once we finish our code, we pass it to the client. Once he got our code, he immediately will ask us for a documentation in order to
consume our API.

A developer may write the best API service, but without the proper documentation, it wouldn't be fully functional.
Here is where Swagger come into play.

Swagger is an Open-Source framework that help us to write better documentation to our RESTful APIs. It's supported by many programming languages, also it implements a UI that make us easier the task of visualize our documentation. In the simplest words, we can be writing
our code at the same time that we are creating the proper documentation.

If we decide to implement Swagger in our development cycle, these are some of the benefits we will get:
- Our RESTful APIs will be simple to use right out of the box
- Swagger will solve our needs of documentation at client and server side, also it will solve our testing sandbox needs.
- It comes with an open-sourced front end, which quickly allows us to work with the API.

## Install
Let's move to the important part: Configure Swagger in our projects
We will need these:
- NodeJs installed in our environments.
- Knowledge about NodeJs.
- Knowledge about Express framework
- Finally, we will need knowledge about RESTFUL services

- Let's begin setting up Express, in the case you don't have it, run this in the terminal:
```sh
$ npm install express -g
```

- Once you got it, install the generator for express projects:
```sh
$ npm install express-generator -g
```

- Then, create a new project:
```sh
$ express swagger_test
```

- You will have a new project with a folder structure, if you don't know about express, [refer to this link](http://www.journaldev.com/7993/nodejs-express-js-and-express-generator-module-basics)

- Now we need to execute an install in order to install dependencies included in the package.json:
```sh
$ npm install
```
- To check that everything went fine, run the sever by using:
```sh
$ npm start
```
- Check that there is no errors in the terminal

### Swagger: Dependencies

- We will use a module called [jsdoc-express-with-swagger](https://www.npmjs.com/package/jsdoc-express-with-swagger)
```sh
$ npm install jsdoc-express-with-swagger
```

- Also, we will need to clone the [Swagger UI repo](https://github.com/swagger-api/swagger-ui), the **dist** folder contains a functioning client of Swagger UI, then you have it, remove the rest.
```sh
$ git clone https://github.com/swagger-api/swagger-ui.git
```

- Rename the folder "dist" to "swagger".
### Swagger: Coding...
- Go to app.js and require a node module
```javascript
var swagger = require('jsdoc-express-with-swagger');
```

- Create a json file in order to work as config file for our Swagger module, I've created here: './app/config/swagger.json', it looks like this:
```json
{
    "swagger":"2.0",
    "info": {
        "title": "Sample API",
        "description":"API Documentation for developers",
        "version": "1.0.1",
        "contact":{
          "name":"Julio Nuñez Quesada",
          "url": "http://juhunuque.github.io/",
          "email":"juhunuque@gmail.com"
        }
    },
    "host":"http://localhost",
    "basePath": "/v1",
    "apiPath": "/api",
    "apiFiles": ["./routes/index.js"],
    "consumes":"application/json",
    "produces":"application/json",
    "tags":[
      {
        "name": "index",
        "description": "Everything related with the sample"
      }
    ],
    "definitions":{
      "Pet":{
        "type":"object",
        "required":[
          "name",
          "photoUrls"
        ],
        "properties":{
          "id":{
            "type":"integer",
            "format":"int64"
          },
          "name":{
            "type":"string",
            "example":"doggie"
          }
        },
        "xml":{
          "name":"Pet"
        }
      }
    }
}
```
Note that there are 2 important lines here:
- apiPath where we are going to load our APIs documentation in json format.
- apiFiles, here we should list the files that contain our routes.

If you want to know more about this structure, you can visit the [official documentation](http://swagger.io/specification/). Also, there is an [online editor](http://editor.swagger.io), so you can use it to validate your settings. You can write your settings using YAML syntax too.

- Go to our swagger folder and access the index.html, look for a line like this:
'''javascript
url = "http://petstore.swagger.io/v2/swagger.json";
'''
And modify it like this:
```javascript
url = "/api"; // Note that we are using the value of our "apiPath"
```

- Let's continue with our app.js file and load our settings file into our swagger module:
```javascript
var swaggerConfig = require('./app/config/swagger.json');
swagger.init(app, swaggerConfig);
```

- We need to tell to Express where it can find Swagger UI, in which folder. In order to do that, add this:
```javascript
app.use('/', routes); // Be careful to place the swagger route after your route's declaration
// Swagger Route
app.use(express.static(path.join(__dirname, 'swagger')));
```

- Now, let's create a endpoint in order to serve our Swagger UI:
```javascript
app.get('/apiDocs', function (req, res) {
   res.sendFile(path.join(__dirname, './swagger', 'index.html'));
});
```
### Swagger: To Document a endpoint
- Finally, let's create the documentation in a endpoint. Go to ./routes/index.js, and add this one:
'''javascript
/**
 *  @swagger
 *  /helloWorld:
 *    get:
 *      tags:
 *        - index
 *      summary: Sample Hello World
 *      operationId: helloWorld
 *      description: Returns Hello message
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: Successful Operation
 *          schema:
 *            type: object
 *            properties:
 *              msg:
 *                type: string
 *        400:
 *          description: Invalid Status
 */
router.get('/helloWorld', function(req, res, next) {
  res.json({msg:"Hello World!"});
});
'''

In that way, we can create documentation for an endpoint, now run the server and to access to 'http//localhost:3000/api', you will see a json file with all our Swagger settings, and if you access to 'http://localhost:3000/apiDocs', you will see the Swagger web interface with all our configuration, ready to be consumed by anyone.
