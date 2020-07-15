import React, { Component } from "react";
import "./RulesArea.css";

class Rules extends Component {
    render() {
        const { wager, winningHand } = this.props;
        return (
            <div className="RulesArea">
                <div className="row">
                    <div className="Rules-header">PAYOUTS</div>
                </div>

                <div
                    className={`row ${
                        winningHand === "ROYAL FLUSH" && "winning"
                    }`}
                >
                    <div>Royal Flush</div>
                    <div>${wager * 250}</div>
                </div>

                <div
                    className={`row
                            ${winningHand === "STRAIGHT FLUSH" && "winning"}`}
                >
                    <div>Straight Flush</div>
                    <div>${wager * 50}</div>
                </div>

                <div
                    className={`row 
                            ${winningHand === "FOUR OF A KIND" && "winning"}`}
                >
                    <div>Four of a Kind</div>
                    <div>${wager * 25}</div>
                </div>

                <div
                    className={`row ${
                        winningHand === "FULL HOUSE" && "winning"
                    }`}
                >
                    <div>Full House</div>
                    <div>${wager * 9}</div>
                </div>

                <div className={`row ${winningHand === "FLUSH" && "winning"}`}>
                    <div>Flush</div>
                    <div>${wager * 6}</div>
                </div>

                <div
                    className={`row ${winningHand === "STRAIGHT" && "winning"}`}
                >
                    <div>Straight</div>
                    <div>${wager * 4}</div>
                </div>

                <div
                    className={`row
                            ${winningHand === "THREE OF A KIND" && "winning"}`}
                >
                    <div>Three of a Kind</div>
                    <div>${wager * 3}</div>
                </div>

                <div
                    className={`row ${winningHand === "TWO PAIR" && "winning"}`}
                >
                    <div>Two Pair</div>
                    <div>${wager * 2}</div>
                </div>

                <div
                    className={`row ${
                        winningHand === "ONE PAIR, JACKS OR BETTER" && "winning"
                    }`}
                >
                    <div>One Pair, Jacks or Better</div>
                    <div>${wager * 1}</div>
                </div>
            </div>
        );
    }
}

export default Rules;
