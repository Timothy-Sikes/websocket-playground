var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var values2 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "N", "Q", "K"];

var encodingValue = 0xDCA1
var ecnodingSet = 0xD83C

function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle(deck)
{
	// for 1000 turns
	// switch the values of two random cards
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function draw(deck)
{
    if (deck.length != 0) {
        return { "status" : "Success", "result": deck.shift() };
    }
    else {
        return { "status" : "Failure", "error": "Empty Deck" };
    }
}

function toStringCard(card)
{
    if (card === undefined) {
        return ""
    }
    else {
        return card.Value + " of " + card.Suit
    }
}

function toStringFancyCard(card)
{
    if (card === undefined) {
        return ""
    }
    else {
        return String.fromCharCode(ecnodingSet,
            encodingValue + getDistanceFromAceOfSpaces(card.Suit, card.Value))
    }
}

function toString(deck)
{
    if (deck.length === 0) {
        return ""
    }
    else {
        return deck.map(x => toStringCard(x)).join(', ');
    }
}

function toStringFancy(deck)
{
    if (deck.length === 0) {
        return ""
    }
    else {
        return deck.map(x =>
            toStringFancyCard(x)).join(' ');
    }
}

function getDistanceFromAceOfSpaces(suit, value)
{
    multiplier = 1;
    if (suit == "spades") {
        multiplier = 0
    }
    if (suit == "hearts") {
        multiplier = 1
    }
    if (suit == "diamonds") {
        multiplier = 2
    }
    if (suit == "clubs") {
        multiplier = 3
    }

    return (multiplier * 16) + (getValue(value));
}

function getValue(value)
{
    return values2.indexOf(value)
}

module.exports = {
    getDeck,
    shuffle,
    draw,
    toString,
    toStringFancy
}
