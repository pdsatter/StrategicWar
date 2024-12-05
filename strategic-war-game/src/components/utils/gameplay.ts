import { Deck, Suit, CardValue, Card } from "./classes";

export function shuffleDeck(deck: Deck): Deck {
    const shuffledDeck = [...deck.cards];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return { ...deck, cards: shuffledDeck };
}

export function createDeck(): Deck {
    const suits = [Suit.clubs, Suit.spades, Suit.diamonds, Suit.hearts];
    const values = [
        CardValue.Two, CardValue.Three, CardValue.Four, CardValue.Five, CardValue.Six,
        CardValue.Seven, CardValue.Eight, CardValue.Nine, CardValue.Ten,
        CardValue.Jack, CardValue.Queen, CardValue.King, CardValue.Ace
    ];
    
    const cards: Card[] = [];

    for (const suit of suits) {
        for (const value of values) {
            cards.push({ value, suit });
        }
    }

    return {cards};
}

export function splitDeck(deck: Deck): Deck[] {
    const half = Math.ceil(deck.cards.length / 2);
    const firstSplit = { ...deck, cards: deck.cards.slice(0, half) };
    const secondSplit = { ...deck, cards: deck.cards.slice(half) };

    return [firstSplit, secondSplit];
}

export function getStartingDecks(): Deck[] {
    let startingDeck = createDeck();
    startingDeck = shuffleDeck(startingDeck);

    return splitDeck(startingDeck);
}


