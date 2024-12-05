import React from 'react';
import { Game, Deck, Card } from '../utils/classes';
import { Col, Row } from 'react-bootstrap';


const GamePage: React.FC = () => {
    const game = new Game();

    const renderCard = (card: Card, showFace: boolean) => {
        const imagePath = showFace
            ? `/card-images/${card.skin?.faceSkinFilePath}`
            : `/card-images/${card.skin?.backSkinFilePath}`;

        return (
            <img
                key={`${card.suit}-${card.value}`}
                src={imagePath}
                alt={`${card.value} of ${card.suit}`}
                style={{ width: '100px', margin: '10px', border: '1px solid black' }}
            />
        );
    };


    const renderDeck = (deck: Deck) => {
        return (
            <div style={{ position: 'relative', display: 'inline-block', width: '100px', margin: '10px' }}>
                <img
                    src="/card-images/back.svg"
                    alt="Card back"
                    style={{ width: '100%' }}
                />
                <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '2px 5px',
                    borderRadius: '3px'
                }}>
                    {deck.cards.length}
                </span>
            </div>
        );
    };
    return (
        <>
            <div>
                <h1>Player 2</h1>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {game.getPlayer2().getHand().getCards().map(card => renderCard(card, false))}
                    </Col>
                    <Col xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderDeck(game.getPlayer2().getDeck())}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </div>
            <div>
                <h1>Player 1</h1>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {game.getPlayer1().getHand().getCards().map(card => renderCard(card, true))}
                    </Col>
                    <Col xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderDeck(game.getPlayer1().getDeck())}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </div>
        </>
    );
}

export default GamePage;