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

    const suitNames: { [key in Suit]: string } = {
        [Suit.clubs]: 'C',
        [Suit.spades]: 'S',
        [Suit.diamonds]: 'D',
        [Suit.hearts]: 'H'
    };

    const valueNames: { [key in CardValue]: string } = {
        [CardValue.Two]: '2',
        [CardValue.Three]: '3',
        [CardValue.Four]: '4',
        [CardValue.Five]: '5',
        [CardValue.Six]: '6',
        [CardValue.Seven]: '7',
        [CardValue.Eight]: '8',
        [CardValue.Nine]: '9',
        [CardValue.Ten]: 'T',
        [CardValue.Jack]: 'J',
        [CardValue.Queen]: 'Q',
        [CardValue.King]: 'K',
        [CardValue.Ace]: 'A'
    };

    const cards: Card[] = [];
    for (const suit of suits) {
        for (const value of values) {
            const faceSkinFilePath = `${valueNames[value]}${suitNames[suit]}.svg`;
            const backSkinFilePath = 'back.svg';
            cards.push({ value, suit, skin: { faceSkinFilePath, backSkinFilePath } });
        }
    }
    return { cards };
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


