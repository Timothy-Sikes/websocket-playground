const ws = new WebSocket('ws://localhost:8080');

drawAction = {"action" : "draw"};
startAction = {"action" : "startDeck"};

currentDeckId = 0;
currentHand = [];

ws.onopen = function open() {
  console.log("Conntected!")
};

ws.onmessage = function incoming(data) {
  console.log("Recieved: " + data)
  console.log(data);

  var parsed = JSON.parse(data.data);

  switch(parsed.action)
  {
    case "NewDeck":
      updateDeck(parsed.deckId);
      break;
    case "Draw":
      updateHand(parsed.cardsJson);
      console.log(currentHand);
      break;
    default:
      console.log("unknown response");
  }
  
};

function updateDeck(deckId)
{
  currentDeckId = deckId;
}

function updateHand(cards)
{
  currentHand = currentHand.concat(cards);
}

function drawFromDeck(deckId, count=1) {
    drawAction.deckId = deckId;
    drawAction.actionTotal = count;

    ws.send(JSON.stringify(drawAction))
}

function getNewDeck() {
  ws.send(JSON.stringify(startAction))
}
