// const express = require("express");
// //const expressValidator = require('express-validator');
// const app = express();
// var cors = require('cors');
// app.use(express.urlencoded({ extended: false }));
// app.use(cors())
// const lodash =require("lodash")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const welcomeMessage = {
  from: "Clement",
  text: "Welcome to Freeborn chat system!",
  id: 0
}


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [
    {
        from: "Clement",
        text: "Welcome to Freeborn chat system!",
        id: 0,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "Hello",
        id: 1,
         timeStamp: new Date()
    },
    {
        from: "clement",
        text: "welcome",
        id: 2,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "long time",
        id: 3,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 4,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "real good to be hear",
        id: 5,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "you looking good",
        id: 6,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "Hello",
        id: 7,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "welcome",
        id: 8,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "long time",
        id: 9,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 10,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "welcome",
        id: 11,
        timeStamp: new Date()
    },
    {
        from: "mark",
        text: "long time",
        id: 12,
        timeStamp: new Date()
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 13,
        timeStamp: new Date()
    }
]

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// // this will get the array of all messages
 app.get("/messages", function(request, response){
  response.json(messages)
 })
app.get("/messages/latest", function(request, response){ 
  //const latest =messages
  response.json(messages.slice(-2))
})
  // this will get the array of message by id only
 app.get("/messages/:id", function(request, response){
   const messageId =request.params.id
    const myMessage =messages.filter(message=> message.id ==messageId);
  response.send(myMessage);
 });

 app.post("/messages",function(request, response){
   const newMessage =request.body;
   newMessage.id= messages.length;
   newMessage.timeStamp = new Date()
   messages.push(newMessage);
 response.status(201).json(newMessage);
});

app.put("/messages/:id", function(request, response){
   const messageId =request.params.id
   //const updateMessage =request.body;
   const message =messages.filter(message=> {
     return message.id ==messageId
   })[0];
  const index = messages.indexOf(message);
  let keys = Object.keys(request.body);
  keys.forEach(key =>{
    message[key] = request.body[key];
  })
  messages[index]= message;
    //if()
  // newMessage.text =myMessage.text
    //newMessage.id = myMessage.id
  //  newMessage.timeStamp = myMessage.timeStamp
  response.json(messages[index]);
  
})
// app.delete("/messages/:id", function(request, response){
//   const NewMessage = request.body
//   messages = messages.find(message =>message.id )
//   response.status(204).json(messages)
// })

//this is to validate the text field
app.listen(process.env.PORT);
