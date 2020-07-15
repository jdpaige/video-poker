// let royal = [
//     {
//         suit: "DIAMONDS",
//         value: "ACE",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "KING",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "10",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "JACK",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "QUEEN",
//     },
// ];

// let straightFlush = [
//     {
//         suit: "HEARTS",
//         value: "9",
//     },
//     {
//         suit: "HEARTS",
//         value: "10",
//     },
//     {
//         suit: "HEARTS",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "8",
//     },
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
// ];

// const flush = [
//     {
//         suit: "CLUBS",
//         value: "2",
//     },
//     {
//         suit: "CLUBS",
//         value: "5",
//     },
//     {
//         suit: "CLUBS",
//         value: "QUEEN",
//     },
//     {
//         suit: "CLUBS",
//         value: "7",
//     },
//     {
//         suit: "CLUBS",
//         value: "ACE",
//     },
// ];

// const straight = [
//     {
//         suit: "DIAMONDS",
//         value: "6",
//     },
//     {
//         suit: "CLUBS",
//         value: "9",
//     },
//     {
//         suit: "SPADES",
//         value: "7",
//     },
//     {
//         suit: "HEARTS",
//         value: "8",
//     },
//     {
//         suit: "HEARTS",
//         value: "10",
//     },
// ];

// const onePairNotJacks = [
//     {
//         suit: "HEARTS",
//         value: "8",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "8",
//     },
//     {
//         suit: "CLUBS",
//         value: "4",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "ACE",
//     },
// ];

// const onePairJacks = [
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "8",
//     },
//     {
//         suit: "CLUBS",
//         value: "JACK",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "ACE",
//     },
// ];

// const trips = [
//     {
//         suit: "CLUBS",
//         value: "9",
//     },
//     {
//         suit: "HEARTS",
//         value: "JACK",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "4",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "CLUBS",
//         value: "JACK",
//     },
// ];

// const twoPair = [
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "8",
//     },
//     {
//         suit: "CLUBS",
//         value: "JACK",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
// ];

// const quads = [
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "JACK",
//     },
//     {
//         suit: "CLUBS",
//         value: "JACK",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "JACK",
//     },
// ];

// const fullHouse = [
//     {
//         suit: "SPADES",
//         value: "7",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "JACK",
//     },
//     {
//         suit: "CLUBS",
//         value: "JACK",
//     },
//     {
//         suit: "SPADES",
//         value: "JACK",
//     },
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
// ];

// const nothing = [
//     {
//         suit: "HEARTS",
//         value: "7",
//     },
//     {
//         suit: "SPADES",
//         value: "ACE",
//     },
//     {
//         suit: "SPADES",
//         value: "2",
//     },
//     {
//         suit: "CLUBS",
//         value: "KING",
//     },
//     {
//         suit: "DIAMONDS",
//         value: "6",
//     },
// ];

const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
};

// hand should be the entire curDraw array
// needs an array of objects where each object is a card formatted as such:
/*
{
    code: "4C",
    image: "https://...",
    suit: "CLUBS",
    value: "4"
}

*/
function score(hand) {
    let cards = [];
    let c = new Set();
    // New Set containing the numerical values of each card
    // New array containing only the values from the deckofcards api
    hand.forEach((card) => {
        c.add(cardValues[card.value]);
        cards.push(cardValues[card.value]);
    });

    if (c.size === 5) {
        if (isFlush(hand)) {
            if (isStraight(cards)) {
                if (highCard(cards) === 14) {
                    return { score: 250, msg: "ROYAL FLUSH" };
                } else {
                    return { score: 50, msg: "STRAIGHT FLUSH" };
                }
            }
            return { score: 6, msg: "FLUSH" };
        } else if (isStraight(cards)) {
            return { score: 4, msg: "STRAIGHT" };
        }
    } else if (c.size === 4) {
        if (jacksOrBetter(cards)) {
            return { score: 1, msg: "ONE PAIR, JACKS OR BETTER" };
        }
    } else if (c.size === 3) {
        if (isTrips(cards)) {
            return { score: 3, msg: "THREE OF A KIND" };
        } else {
            return { score: 2, msg: "TWO PAIR" };
        }
    } else if (c.size === 2) {
        if (isQuads(cards)) {
            return { score: 25, msg: "FOUR OF A KIND" };
        } else {
            return { score: 9, msg: "FULL HOUSE" };
        }
    }
    return { score: 0, msg: "GAME OVER" };
}

function isFlush(hand) {
    let c = new Set();
    hand.forEach((card) => c.add(card.suit));
    // c.size === 1 means any flush
    return c.size === 1;
}

function isStraight(cardVals) {
    cardVals.sort((a, b) => a - b);

    // a straight will contain values where each successive one is 1 higher
    // than the previous.  therefore, in order to be a straight,
    // the last must be exactly 4 higher than the first
    return cardVals[0] + 4 === cardVals[4];
}

function highCard(cardVals) {
    cardVals.sort((a, b) => b - a);
    return cardVals[0];
}

function jacksOrBetter(cardVals) {
    let check;
    do {
        check = cardVals.shift();
    } while (!cardVals.includes(check));
    return check >= 11;
}

function isTrips(cardVals) {
    let repeats = countRepeats(cardVals);
    for (let val in repeats) {
        if (repeats[val] === 3) {
            return true;
        }
    }
}

function countRepeats(cardVals) {
    let cardObj = {};
    cardVals.forEach((val) => {
        if (!(val in cardObj)) {
            cardObj[val] = 1;
        } else {
            cardObj[val]++;
        }
    });
    return cardObj;
}

function isQuads(cardVals) {
    let repeats = countRepeats(cardVals);
    for (let val in repeats) {
        if (repeats[val] === 4) {
            return true;
        }
    }
}

export { score };
