import React, { Component } from "react";
import Cards from "./Cards";
import { score } from "../Rules";
import Wager from "./Wager";
import "./PlayArea.css";

export default class PlayArea extends Component {
    render() {
        const {
            cards,
            held,
            hold,
            drawsLeft,
            drawCards,
            newGame,
            showResults,
            bank,
            wager,
            updateWager,
            winnings,
            reload,
        } = this.props;

        return (
            <div className="PlayArea">
                <div className="PlayArea-info">
                    <h3>Bank: ${this.props.bank}</h3>
                    {drawsLeft === 0 ? (
                        <h3 className="result">{score(cards).msg}</h3>
                    ) : (
                        <h3 className="result">&nbsp;</h3>
                    )}
                </div>

                <div className="notcards">
                    {bank === 0 ? (
                        <button className="reload-btn" onClick={reload}>
                            Reload?
                        </button>
                    ) : drawsLeft > 0 ? (
                        <button className="continue-btn" onClick={drawCards}>
                            Draw!
                        </button>
                    ) : (
                        <button className="continue-btn" onClick={newGame}>
                            New Game
                        </button>
                    )}

                    <Wager
                        className="notcards-item"
                        drawsLeft={drawsLeft}
                        showResults={showResults}
                        bank={bank}
                        winnings={winnings}
                        updateWager={updateWager}
                        wager={wager}
                    />
                </div>

                <Cards
                    cards={cards}
                    held={held}
                    hold={hold}
                    drawsLeft={drawsLeft}
                />
            </div>
        );
    }
}
