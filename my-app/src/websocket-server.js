var io = require('socket.io')

const server = io.listen(8080);

playAction = {"action" : "play"};

server.on('connection', function connection(socket) {

    socket.on('message', function incoming(message) {
      console.log('received: %s', message);
  
      var parsed = JSON.parse(message)
  
      if (typeof parsed !== 'undefined') {
    
          response = ""
  
          switch(parsed.action)
          {
              case "play":
                  response = play(parsed);
                  break;
              default:
                  response = {"message" : "Unknown action"}
          }
  
          socket.send(response);
      }
    });
  
    socket.send(JSON.stringify({
      "description" : "You have started",
      "status" : "success",
      "action" : "OnStart"
      }));
  });

function play(data)
{
    console.log("Got the play action.");
    console.log("sending: " + JSON.stringify(playAction));

    var thisAction = playAction;
    thisAction["location"] = data.location;
    server.emit("message", JSON.stringify(thisAction));
}