const express = require("express");
//const expressValidator = require('express-validator');
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors())
const lodash =require("lodash")
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

const welcomeMessage = {
  from: "Clement",
  text: "Welcome to Freeborn chat system!",
  id: 0
}

const messages = require("./messages.json");
const { check, validationResult } = require('express-validator/check');

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

console.log(JSON.stringify(messages, null, 4))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// // this will get the array of all messages
 app.get("/messages", function(request, response){
  response.json(messages)
 })

//this will get the last ten message(as latest message)
app.get("/messages/latest", function(request, response){ 
  response.json(messages.slice(-2))
})

//this will return all messages that includes the search term
app.get("/messages/search", function (request, response) {
  let searchTerm = request.query.text;
  response.json(searchMessages(messages, searchTerm));
});

function searchMessages(messages, searchTerm){
  return messages.filter(message=>{
    return message.from.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.text.toLowerCase().includes(searchTerm.toLowerCase()) ;
  })
} 
  // this will get message by id only
 app.get("/messages/:id", function(request, response){
   const messageId =request.params.id
    const myMessage =messages.filter(message=> message.id ==messageId);
  response.json(myMessage);
 });

//this create a new message bnbb
 app.post("/messages",[check("from" ,{min:2}),check("text").isString({min:5}) ],function(request, response){
   const errors = validationResult(request);
   if(!errors.isEmpty()){
     return request.status(422).json({errors: errors.array() });
   }
   const newMessage =request.body;
   newMessage.id= messages.length;
   newMessage.timeStamp = new Date()
   messages.push(newMessage);
 response.status(201).json(newMessage);
});


app.put('/messages/:id', function(request, response)  {

  let contactId = request.params.id;

  let updateMessage = messages.filter(message => {
    return message.id ==contactId;
  })[0];

  const index = messages.indexOf(updateMessage);

  let keys = Object.keys(request.body);

  keys.forEach(key => {
    updateMessage[key] = request.body[key];
  });

  messages[index] = updateMessage;

  // response.json({ message: `message ${contactId} updated.`});
  response.json(messages[index]);
});

app.delete("/messages/:id", function(request, response){
const selectedId = request.params.id;
const found = messages.some(message=>message.id == selectedId)
if (found){
  messages = messages.filter(message=>message.id != selectedId);
  response.status(204).json({ msg : `Message has been deleted`})  
  } else {
    response.status(400).json({ msg : `No message with the id of ${selectedId}`})
  }
})


//this is to validate the text field
app.listen(process.env.PORT);
