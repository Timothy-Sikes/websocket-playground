var io = require("socket.io");
var uuidv4 = require("uuid");
var Game = require("./Game");

console.log("Imported Game module.");

const server = io.listen(8000);
console.log("set up server");

var games = {};
var gameId = 0;

var game = null;

server.on("connection", function connection(socket) {

  console.log("Imported Game module.");
  socket.on("message", function incoming(message) {
    console.log("received: %s", message);

    var parsed = JSON.parse(message);

    if (typeof parsed !== "undefined") {
      var response = "";

      switch (parsed.action) {
        case "newGame":
          response = newGame(parsed);
          break;
        case "rotateBoard":
          response = rotateBoard(parsed);
          break;
        default:
          response = { message: "Unknown action" };
      }

      socket.send(response);
    }
  });

  socket.send(
    JSON.stringify({
      description: "You have started",
      status: "success",
      action: "OnStart"
    })
  );
});

function newGame(data) {
  // gameId = uuidv4();
  // console.log(Game);
  // var theGame = new Game();
  // games[gameId] = theGame;
  game = new Game();
  game.createBoard();
  var gameId = uuidv4();

  console.log("sending board");
  console.log(game.board);
  console.log("the game");
  console.log(game);
  server.emit(
    "message",
    JSON.stringify({
      action: "newGame",
      gameId: gameId,
      game: game
    })
  );
}

function rotateBoard(data) {
  console.log("game before rotation:");
  console.log(game.toJson());
  game.rotateBoard();
  console.log("sending the updated game:");
  console.log(game.toJson());
  server.emit(
    "message",
    JSON.stringify({
      action: "broadcastBoard",
      gameId: gameId,
      game: game.toJson()
    })
  );
}
