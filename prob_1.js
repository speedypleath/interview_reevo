const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

class Card {
    constructor(rank, suite) {
        this.rank = rank;
        this.suite = suite;
    }
}

class Deck {
    constructor() {
        this.cards = ranks.reduce((p, a) => [...p, ...suits.map(b => new Card(a, b))], []);
    }

    // initial voiam sa rezolv cerinta folosind Schwartzian transform dar observ ca exista niste probleme cu .sort in js
    shuffle = () => {
        for (let i = 51; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
          }
    }
}

// este precizat ca isFlush si isStraight sunt metode dar nu mi se pare ca se potrivesc ca metode in niciuna dintre cele 2 clase, o sa le implementez ca functii
isFlush = (cards) => cards.reduce((p, x) => p.suite === x.suite ? p : false);
isStraight = (cards) => { 
    cards = cards.map(a => ranks.indexOf(a.rank));
    return Math.abs(Math.max(...cards) - Math.min(...cards)) < 5;
}

const deck = new Deck();
const unshuffled = deck.cards;
deck.shuffle()
const shuffled = deck.cards;
console.assert(shuffled.length === unshuffled.length && unshuffled.every((card) => shuffled.includes(card)), 'Shuffled deck doesn\t contain all cards')

const flush = [new Card('A', 'Hearts'), new Card('5', 'Hearts'), new Card('2', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts')];
const notFlush = [new Card('A', 'Hearts'), new Card('5', 'Diamonds'), new Card('2', 'Diamonds'), new Card('3', 'Spades'), new Card('4', 'Clubs')];
console.assert(isFlush(flush), 'Passed cards have the same suit');
console.assert(!isFlush(notFlush), 'Passed cards don\'t have the same suit');

const straight = [new Card('A', 'Hearts'), new Card('5', 'Hearts'), new Card('2', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts')];
const notStraight = [new Card('A', 'Hearts'), new Card('5', 'Hearts'), new Card('3', 'Hearts'), new Card('4', 'Hearts'), new Card('6', 'Hearts')];
console.assert(isStraight(straight), 'Passed cards have consecutive ranks');
console.assert(!isStraight(notStraight), 'Passed cards don\'t have consecutive ranks');