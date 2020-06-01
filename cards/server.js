var deck = require("./deck.js")
var io = require('socket.io')

const server = io.listen(8080);

//const wss = new WebSocket.Server({ port: 8080 });
var currentDecks = {};

server.on('connection', function connection(socket) {

  socket.on('message', function incoming(message) {
    console.log('received: %s', message);

    var parsed = JSON.parse(message)

    if (typeof parsed !== 'undefined') {
  
        response = ""

        switch(parsed.action)
        {
            case "startDeck":
                response = startDeckAction(parsed);
                break;
            case "draw":
                response = drawAction(parsed);
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

function drawAction(message)
{
    drawnCards = []
    for (i = 0; i < message.actionTotal; i++) {
        response = drawCard(currentDecks[message.deckId])
        if (response.status === "Success") {
            drawnCards.push(response.result)
        }
    }

    return JSON.stringify({
        "description" : "You drew the " + deck.toStringFancy(drawnCards),
        "cards" : deck.toStringFancy(drawnCards),
        "cardsText" : deck.toString(drawnCards),
        "cardsJson" : drawnCards,
        "status" : "success",
        "action" : "Draw"
    });
}

function startDeckAction(message)
{
    var deckId = startDeck();

    return JSON.stringify({
        "description" : "started a new deck",
        "deckId" : deckId,
        "status" : "success",
        "action" : "NewDeck"
    });
}

function startDeck()
{
    var deckId = Math.floor(Math.random() * 100);

    currentDecks[deckId] = deck.getDeck();

    deck.shuffle(currentDecks[deckId]);

    return deckId;
}

function drawCard(deck1)
{
    return deck.draw(deck1);
}
