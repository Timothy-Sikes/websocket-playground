var socket = io("http://localhost:8080");

drawAction = {"action" : "draw"};
startAction = {"action" : "startDeck"};

currentDeckId = -1;
currentHand = [];

socket.on("connect", () => {
    console.log("Conntected!")
    getNewDeck()
});
  
socket.on("message", (data) => {
    console.log("Recieved: " + data)
    console.log(data);

    var parsed = JSON.parse(data);

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
});

function updateDeck(deckId)
{
  currentDeckId = deckId;
}

function getHand()
{
    return currentHand;
}

function updateHand(cards)
{
  currentHand = currentHand.concat(cards);

  console.log("CARDS: " + cards);
  console.log(cards);
  console.log(cards[0]);

//   if (handApp._data.cards === undefined) {
//       handApp._data.cards = cards;
//   }
  //else {
    cardsApp._data.hand.push(cards[0]);
  //}

//   cards.foreach(function(card) {
//     handApp._data.cards.push(card)
//   });
}

function drawFromDeck(deckId, count=1) {
    drawAction.deckId = deckId;
    drawAction.actionTotal = count;

    socket.send(JSON.stringify(drawAction))
}

function getNewDeck() {
    socket.send(JSON.stringify(startAction))
}

async function start()
{
    Vue.component('cards',
    {
        data() { return  { hand: getHand()}; },
        template: `
             <p>
                 {{ hand.Suit }} {{ hand.Value }}
             </p>
        `
    })

    cardsApp = new Vue({
        el: '#hand',
        data: {
            hand : [{ Value: '9', Suit: 'diamonds' }]
        }
    })

    // Vue.component('cards', {
    //     data: function () {
    //         return {cards: null};
    //     },
    //     props: {
    //         cards: Object
    //     },
    //     template: `

    //     <ul id="example-1">
    //     <li v-for="item in cards">
    //         {{ item.Suit }} {{ item.Value }}
    //     </li>
    //     </ul>
    // `
    // });

    // // cards = [{ Value: '9', Suit: 'diamonds' },]

    // cardsApp = new Vue({
    //     el: '#hand',
    //     data: {cards : []}
    // })

    document.getElementById("draw").addEventListener("click", drawCards);
}

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  ready(function() {
    start();
  });

function drawCards() {
    if (currentDeckId === -1) {
        getNewDeck();
    }

    console.log(currentHand);

    drawFromDeck(currentDeckId, 1);
}