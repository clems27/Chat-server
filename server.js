const express = require("express");
const app = express();
var cors = require('cors');
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())


const welcomeMessage = {
  from: "Clement",
  text: "Welcome to Freeborn chat system!",
  id: 0
}

let messages = require("./messages.json");

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

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
  console.log(searchMessages(messages, searchTerm))
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
    const myMessage =messages.find(message=> message.id ==messageId);
   if(myMessage){
     response.status(200).json(myMessage);
   }
   else if(!myMessage){
          response.status(404).json({ msg : `No message with the id of ${messageId}`}) ;
   }
 });

//this create a new message
 app.post("/messages",function(request, response){
   const newMessage =request.body;
   newMessage.id= messages.length;
   newMessage.timeStamp = new Date()
   messages.push(newMessage);
 response.status(201).json(newMessage);
});

//this update the message by id
app.put('/messages/:id', function(request, response)  {
   const id = parseInt(request.params.id);

  const recipeSubmitted = request.body;
  const existingRecipe = messages.find(message => message.id === r.id);
  if (existingRecipe) {
    existingRecipe = recipeSubmitted;
    response.json(existingRecipe);
  } else {
    response.sendStatus(404);
  }

//   let contactId = request.params.id;

//   let updateMessage = messages.filter(message => {
//     return message.id ==contactId;
//   })[0];

//   const index = messages.indexOf(updateMessage);

//   let keys = Object.keys(request.body);

//   keys.forEach(key => {
//     updateMessage[key] = request.body[key];
//   });

//   messages[index] = updateMessage;

//   //response.json({ message: `message ${contactId} updated.`});
//   response.json(messages[index]);
});

// this delete message by id
app.delete("/messages/:id", function(request, response){
const deleteId = request.params.id;
const foundDeleteId = messages.some(message=>message.id == deleteId)
if (foundDeleteId){
  messages = messages.filter(message=>message.id !== deleteId);
  response.json("Selected message has been deleted")  
  } else {
    response.status(400).json({ msg : `No message with the id of ${deleteId}`})
  }
})


//this is to validate the text field
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});