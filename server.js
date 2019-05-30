const express = require("express");
//const expressValidator = require('express-validator');
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const lodash =require("lodash")

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
        id: 0
    },
    {
        from: "mark",
        text: "Hello",
        id: 1
    },
    {
        from: "clement",
        text: "welcome",
        id: 2
    },
    {
        from: "mark",
        text: "long time",
        id: 3
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 4
    },
    {
        from: "mark",
        text: "real good to be hear",
        id: 5
    },
    {
        from: "clement",
        text: "you looking good",
        id: 6
    },
    {
        from: "mark",
        text: "Hello",
        id: 7
    },
    {
        from: "clement",
        text: "welcome",
        id: 8
    },
    {
        from: "mark",
        text: "long time",
        id: 9
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 10
    },
    {
        from: "clement",
        text: "welcome",
        id: 11
    },
    {
        from: "mark",
        text: "long time",
        id: 12
    },
    {
        from: "clement",
        text: "yeah, indeed",
        id: 13
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
   const id =request.params.id
    const myMessageId =messages.filter(message=> message.id ==id);
  response.send(myMessageId);
 });

 app.post("/messages",function(request, response){
   const newMessage =request.body;
   newMessage.id= messages.length;
   messages.push(newMessage);
 response.status(201).json(newMessage);
});

// app.delete("/messages/:id", function(request, response){
//   const NewMessage = request.body
//   messages = messages.find(message =>message.id )
//   response.status(204).json(messages)
// })

//this is to validate the text field
app.listen(process.env.PORT);
