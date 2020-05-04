const WebSocket = require('ws');
const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

const ws = new WebSocket('ws://localhost:8080');

drawAction = {"action" : "draw"};
startAction = {"action" : "startDeck"};

deckId = 0

ws.on('open', function open() {
  console.log("Connecting...")

  ws.send(JSON.stringify(startAction));
  //drawFromDeck(62)
});

ws.on('message', function incoming(data) {
  console.log("Recieved: " + data)

  var parsed = JSON.parse(data);

  if (parsed.action === "NewDeck") {
      console.log("Sending draw action * 4.");

      drawAction.deckId = parsed.deckId;
      drawAction.actionTotal = 4;

      ws.send(JSON.stringify(drawAction))
  }
  
});

function drawFromDeck(deckId) {
    drawAction.deckId = deckId;
    drawAction.actionTotal = 4;

    ws.send(JSON.stringify(drawAction))
}

// rl.question('Type "draw" or "new deck"', (answer) => {
//     console.log(`Oh, so your favorite food is ${answer}`);
//   });
