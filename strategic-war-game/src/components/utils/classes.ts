import { getStartingDecks } from "./gameplay";

export class Game {
    private player1: Player;
    private player2: Player;
    private winner: Winner;

    constructor() {
        const startingDecks = getStartingDecks();
        this.player1 = new Player(startingDecks[0]);
        this.player2 = new Player(startingDecks[1]);
        this.winner = Winner.Neither;
    }

    getPlayer1(): Player {
        return this.player1;
    }

    getPlayer2(): Player {
        return this.player2;
    }

    getWinner(): Winner {
        return this.winner;
    }

    setWinner(winner: Winner): void {
        this.winner = winner;
    }

    determineWinner(): void {
        const player1CardsLeft = this.player1.getDeck().cards.length + this.player1.getHand().getCards().length;
        const player2CardsLeft = this.player2.getDeck().cards.length + this.player2.getHand().getCards().length;
    
        if (player1CardsLeft === 0) {
            this.winner = Winner.Player2;
        } else if (player2CardsLeft === 0) {
            this.winner = Winner.Player1;
        } else {
            this.winner = Winner.Neither;
        }
    }
}

export class Player {
    private deck: Deck;
    private hand: Hand;

    constructor(deck: Deck) {
        this.deck = deck;
        this.hand = new Hand();
        this.drawCards();
    }

    drawCards(): void {
        while (this.hand.getCards().length < 3 && this.deck.cards.length > 0) {
            const card = this.deck.cards.shift();
            if (card) {
                this.hand.addCard(card);
            }
        }
    }

    playCard(index: number): Card | undefined {
        return this.hand.removeCard(index);
    }

    getDeck(): Deck {
        return this.deck;
    }

    getHand(): Hand {
        return this.hand;
    }
}

export class Hand {
    private cards: Card[] = [];

    getCards(): Card[] {
        return this.cards;
    }

    addCard(card: Card): void {
        if (this.cards.length < 3) {
            this.cards.push(card);
        }
    }

    removeCard(index: number): Card | undefined {
        if (index >= 0 && index < this.cards.length) {
            return this.cards.splice(index, 1)[0];
        }
        return undefined;
    }
}

export interface Deck {
    cards: Card[];
}


export interface Card {
    value: CardValue;
    suit: Suit;
    skin?: CardSkin;
}

export interface CardSkin {
    faceSkinFilePath: string;
    backSkinFilePath: string;
}

export enum Suit {
    clubs = 1,
    spades = 2,
    diamonds = 3,
    hearts = 4,
}

export enum CardValue {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
    Ace = 14
}

export enum Winner {
    Neither = 0,
    Player1 = 1,
    Player2 = 2
}

export enum GameState {
    PickCard = 0,
    Battle = 1,
}
