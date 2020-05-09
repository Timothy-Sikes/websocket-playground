const io = require('socket.io-client');
const readline = require('readline');
const deck = require('./deck.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

//const ws = new WebSocket('ws://localhost:8080');
var socket = io("http://localhost:8080");

drawAction = {"action" : "draw"};
startAction = {"action" : "startDeck"};

currentDeckId = 0;
currentHand = [];

socket.on('open', function open() {
  console.log("Connecting...")

  inputLoop();
});

socket.on('message', function incoming(data) {
  console.log("Recieved: " + data)

  var parsed = JSON.parse(data);

  switch(parsed.action)
  {
    case "NewDeck":
      updateDeck(parsed.deckId);
      break;
    case "Draw":
      updateHand(parsed.cardsJson);
      console.log(currentHand);
      //console.log(deck.toString(currentHand));
      break;
    default:
      console.log("unknown response");
  }
  
});

function updateDeck(deckId)
{
  currentDeckId = deckId;
}

function updateHand(cards)
{
  currentHand = currentHand.concat(cards);
}

function drawFromDeck(deckId) {
    drawAction.deckId = deckId;
    drawAction.actionTotal = 4;

    socket.send(JSON.stringify(drawAction))
}

function getNewDeck() {
  socket.send(JSON.stringify(startAction))
}

function inputLoop()
{
  answer = "";

    rl.question('Type "draw" or "new" or "quit"\n', (answer) => {
      switch (answer)
      {
        case "draw":
          if (currentDeckId === 0) {
            console.log("plz get a new deck first.")
          }
          else {
            drawFromDeck(currentDeckId)
          }
          break;
        case "new":
          getNewDeck()
          break;
        case "quit":
          break;
        default:
          console.log("please try again.")
      }
      inputLoop();
    });
}

inputLoop();