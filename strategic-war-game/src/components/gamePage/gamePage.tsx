import React from 'react';
import { Game, Deck, Card, Suit, CardValue } from '../utils/classes';


const GamePage: React.FC = () => {
    const game = new Game();

    const renderCard = (card: Card) => {
        return (
            <div key={`${card.suit}-${card.value}`} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                Value: {CardValue[card.value]}, Suit: {Suit[card.suit]}
            </div>
        );
    };

    const renderDeck = (deck: Deck) => {
        return (
            <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                {deck.cards.length}
            </div>
        );
    }

    return (
        <>
            <div>
                <h1>Player 2</h1>
                <div style={{ display: 'flex' }}>
                    {game.getPlayer2().getHand().getCards().map(renderCard)}
                    {renderDeck(game.getPlayer2().getDeck())}
                </div>
            </div>
            <div>
                <h1>Player 1</h1>
                <div style={{ display: 'flex' }}>
                    {game.getPlayer1().getHand().getCards().map(renderCard)}
                    {renderDeck(game.getPlayer1().getDeck())}
                </div>
            </div>
        </>
    );
}

export default GamePage;