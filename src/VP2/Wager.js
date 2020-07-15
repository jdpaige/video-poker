import React, { Component } from "react";
import "./Wager.css";

export default class Wager extends Component {
    render() {
        const {
            winnings,
            wager,
            drawsLeft,
            showResults,
            updateWager,
            bank,
        } = this.props;
        return (
            <div className="Wager">
                {drawsLeft === 0 && showResults ? (
                    winnings > 0 ? (
                        <h3>You Win ${winnings}!</h3>
                    ) : (
                        <h3>You lose!</h3>
                    )
                ) : (
                    <div className="Wager-area">
                        <h3 className="Wager-amount">Wager: ${wager}</h3>
                        <div className="Wager-buttons">
                            <button
                                className="Wager-button"
                                disabled={wager === 1 || drawsLeft > 0}
                                onClick={() => updateWager(-1)}
                            >
                                -
                            </button>
                            <button
                                className="Wager-button"
                                disabled={
                                    wager === 5 ||
                                    wager === bank ||
                                    drawsLeft > 0
                                }
                                onClick={() => updateWager(1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
