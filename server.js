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
  response.send(myMessage);
 });

//this create a new message
 app.post("/messages",function(request, response){
   const newMessage =request.body;
   newMessage.id= messages.length;
   newMessage.timeStamp = new Date()
   messages.push(newMessage);
 response.status(201).json(newMessage);
});

//this will delete message by id
app.delete('/messages/:id', (request, response) => {
  let contactId = request.params.id;
  let deletedMessage = messages.filter(message => {
    return message.id == contactId;
    response.json(deletedMessage)
  });

  const index = messages.indexOf(welcomeMessage);

  messages.splice(index, 1);

  response.json({ message: `message Id ${contactId} deleted.`});

});


//this is to validate the text field
app.listen(process.env.PORT);
