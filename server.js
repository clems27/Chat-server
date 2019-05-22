const express = require("express");
const expressValidator = require('express-validator');
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const welcomeMessage = {
  from: "Clement",
  text: "Welcome to Freeborn chat system!",
  id: 0
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]
const { check} = require('express-validator/check')



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// // this will get the array of all messages
 app.get("/messages", function(request, response){
   response.send(messages)
})

// // this will get the array of message by id only
app.get("/messages/:id", function(request, response){
  const id =request.params.id
  const myMessageId =messages.filter(message=> message.id ==id)
  response.json(myMessageId);
});

app.post("/messages",function(request, response){
  const newMessage =request.body;
  const name =request.body.input;
  const messageText = request.body.input
  check("name")
  newMessage.id= messages.length;
  messages.push(newMessage);
  response.status(201).json(newMessage);
  
});

// check =() =>{
  
// }

//this is to validate the text field
app.listen(process.env.PORT);
