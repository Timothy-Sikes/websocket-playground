const WebSocket = require('ws');
var deck = require("./deck.js")

const wss = new WebSocket.Server({ port: 8080 });
var currentDecks = {};

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    var parsed = JSON.parse(message)

    if (typeof parsed !== 'undefined') {
  
        response = ""

        if (parsed.action === "startDeck") {
            var deckId = startDeck();

            response = JSON.stringify({
                "description" : "started a new deck",
                "deckId" : deckId,
                "status" : "success",
                "action" : "NewDeck"
            });
        }

        if (parsed.action === "draw") {

            drawnCards = []
            for (i = 0; i < parsed.actionTotal; i++) {
                drawnCards.push(drawCard(currentDecks[parsed.deckId]))
            }

            response = JSON.stringify({
                "description" : "You drew the " + deck.toStringFancy(drawnCards),
                "cards" : deck.toStringFancy(drawnCards),
                "cardsText" : deck.toString(drawnCards),
                "status" : "success",
                "action" : "Draw"
            });
        }

        ws.send(response);
    }
  });

  ws.send(JSON.stringify({
    "description" : "You have started",
    "status" : "success",
    "action" : "OnStart"
    }));
});

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

startDeck()