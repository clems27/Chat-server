const express = require("express");
//const expressValidator = require('express-validator');
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const lodash =require("lodash")

// const welcomeMessage = {
//   from: "Clement",
//   text: "Welcome to Freeborn chat system!",
//   id: 0
// }
const messages = require("./messages.json")
//const welcomeMessage = require("./welcomeMessage.json");
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//const messages = [welcomeMessage.json]

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// // this will get the array of all messages
 app.get("/messages", (cors), function(request, response){
   response.json(messages)
})

// // this will get the array of message by id only
app.get("/messages/:id", function(request, response){
  const id =request.params.id
  const myMessageId =messages.filter(message=> message.id ==id)
  response.json(myMessageId);
});

app.post("/messages",function(request, response){
  const newMessage =request.body;
    newMessage.id= messages.length;
  messages.push(newMessage);
  response.status(201).json(newMessage);
});

app.delete("/messages/:id", function(request, response){
  const NewMessage = request.body
  messages = messages.find(message =>message.id )
  response.status(204).json(messages)
})

app.get("/messages/search", cors(), function (request, response) {
  let search = request.query.text;
  let filterMessage="Quotes Mentioning ";
  let message =messages
  response.json([filterMessage.concat(search.charAt(0).toUpperCase() 
                 + search.slice(1).toLowerCase(),":"),
                findMatchingMessage(message, search)]);
});



function findMatchingMessage(message, search){
  return message.filter(messsage=>{
    return message.message.includes(search) 
  })
} 

//this is to validate the text field
app.listen(process.env.PORT);
