import React, { useState } from 'react';
import { Game, Deck, Card, GameState, Winner, Player } from '../utils/classes';
import { Col, Row } from 'react-bootstrap';


const GamePage: React.FC = () => {
    const [game] = useState<Game>(new Game());
    const [gameState, setGameState] = useState<GameState>(GameState.PickCard);
    const [player1SelectedCard, setPlayer1SelectedCard] = useState<Card | undefined>(undefined);
    const [player2SelectedCard, setPlayer2SelectedCard] = useState<Card | undefined>(undefined);
    const [battlePile, setBattlePile] = useState<Card[]>([]);

    const waitTimeInMS = 3000;

    function player2PickRandomCard(): Card | undefined {
        const player2 = game.getPlayer2();
        const hand = player2.getHand().getCards();

        const randomIndex = Math.floor(Math.random() * hand.length);
        const card = player2.playCard(randomIndex);

        return card;
    }

    function delay(ms: number = waitTimeInMS): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleCardSelection = (index: number) => {
        if (gameState !== GameState.PickCard) return;
        setGameState(GameState.Battle);

        const player1 = game.getPlayer1();
        const player1Card = player1.playCard(index);
        const player2Card = player2PickRandomCard();

        if (!player1Card || !player2Card) return;

        setPlayer1SelectedCard(player1Card);
        setPlayer2SelectedCard(player2Card);

        handleBattleState(player1Card, player2Card);
    };

    const handleBattleState = async (player1Card: Card, player2Card: Card) => {
        setGameState(GameState.Battle);
        setBattlePile([player1Card, player2Card]);

        await delay();

        const player1 = game.getPlayer1();
        const player2 = game.getPlayer2();
        const player1Deck = player1.getDeck();
        const player2Deck = player2.getDeck();

        if (player1Card.value > player2Card.value) {
            player1Deck.cards.push(...battlePile);
        } else if (player1Card.value < player2Card.value) {
            player2Deck.cards.push(...battlePile);
        } else {
            await initiateDrawBattle(player1, player2);
        }

        handlePickCardState();
    };

    async function initiateDrawBattle(player1: Player, player2: Player) {
        while (true) {
            if (player1.getDeck().cards.length === 0) {
                game.setWinner(Winner.Player2);
                break;
            }

            if (player2.getDeck().cards.length === 0) {
                game.setWinner(Winner.Player1);
                break;
            }

            const player1DrawCard = player1.getDeck().cards.shift();
            const player2DrawCard = player2.getDeck().cards.shift();


            if (player1DrawCard && player2DrawCard) {
                setPlayer1SelectedCard(player1DrawCard);
                setPlayer2SelectedCard(player2DrawCard);
                battlePile.push(player1DrawCard, player2DrawCard);

                await delay();

                if (player1DrawCard.value > player2DrawCard.value) {
                    player1.getDeck().cards.push(...battlePile);
                    break;
                } else if (player1DrawCard.value < player2DrawCard.value) {
                    player2.getDeck().cards.push(...battlePile);
                    break;
                }
            }
        }
    }

    function handlePickCardState() {
        setGameState(GameState.PickCard);
        game.determineWinner();
        const player1 = game.getPlayer1();
        const player2 = game.getPlayer2();

        player1.drawCards();
        player2.drawCards();
    }

    const renderCard = (card: Card, showFace: boolean, onClick?: () => void) => {
        const imagePath = showFace
            ? `/card-images/${card.skin?.faceSkinFilePath}`
            : `/card-images/${card.skin?.backSkinFilePath}`;

        return (
            <img
                key={`${card.suit}-${card.value}`}
                src={imagePath}
                alt={`${card.value} of ${card.suit}`}
                style={{ width: '100px', margin: '10px', border: '1px solid black' }}
                onClick={onClick}
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
                        {game.getPlayer1().getHand().getCards().map((card, index) =>
                            renderCard(card, true, () => handleCardSelection(index))
                        )}
                    </Col>
                    <Col xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderDeck(game.getPlayer1().getDeck())}
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </div>

            {gameState === GameState.Battle && player1SelectedCard && (
                <div>
                    <h2>Battle State</h2>
                    {player1SelectedCard && renderCard(player1SelectedCard, true)}
                    {player2SelectedCard && renderCard(player2SelectedCard, true)}
                </div>
            )}
        </>
    );
}

export default GamePage;