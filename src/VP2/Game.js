import React, { Component } from "react";
import PlayArea from "./PlayArea";
import { score } from "../Rules";
import RulesArea from "./RulesArea";
import axios from "axios";
import "./Game.css";

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckID: "",
            curDraw: [],
            held: Array(5).fill(false),
            numHeld: 0,
            drawsLeft: 0,
            bank: 200,
            wager: 1,

            showResults: false,
        };
        this.drawCards = this.drawCards.bind(this);
        this.toggleHold = this.toggleHold.bind(this);
        this.newGame = this.newGame.bind(this);
        this.updateWager = this.updateWager.bind(this);
        this.reload = this.reload.bind(this);
    }

    async componentDidMount() {
        const init = await axios.get(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );

        const deckID = init.data.deck_id;
        const res = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`
        );
        this.setState({ deckID: deckID, curDraw: res.data.cards });
    }

    async newGame() {
        const init = await axios.get(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );

        const deckID = init.data.deck_id;
        const res = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`
        );
        this.setState({
            deckID: deckID,
            curDraw: res.data.cards,
            drawsLeft: 1,
            numHeld: 0,
            showResults: false,
            held: Array(5).fill(false),
            bank: this.state.bank - this.state.wager,
        });
    }

    async drawCards() {
        const res = await axios.get(
            `https://deckofcardsapi.com/api/deck/${
                this.state.deckID
            }/draw/?count=${5 - this.state.numHeld}`
        );

        const newDraw = res.data.cards;
        const fullDraw = [];
        for (let i = 0; i < 5; i++) {
            if (this.state.held[i]) {
                fullDraw.push(null);
            } else {
                fullDraw.push(newDraw.pop());
            }
        }

        this.setState((st) => ({
            curDraw: st.curDraw.map((card, i) =>
                st.held[i] ? card : fullDraw[i]
            ),
            drawsLeft: st.drawsLeft - 1,
        }));

        if (this.state.drawsLeft === 0) {
            this.setState({
                bank:
                    this.state.bank +
                    score(this.state.curDraw).score * this.state.wager,
            });
            setTimeout(() => {
                this.setState({ showResults: true });
            }, 50);
            setTimeout(() => {
                this.setState({ showResults: false });
            }, 2000);
        }
    }

    toggleHold(idx) {
        this.setState((st) => ({
            held: [
                ...st.held.slice(0, idx),
                !st.held[idx],
                ...st.held.slice(idx + 1),
            ],
            numHeld: st.held[idx] ? st.numHeld - 1 : st.numHeld + 1,
        }));
    }

    updateWager(val) {
        this.setState({ wager: this.state.wager + val });
    }

    reload() {
        this.setState({ bank: 200 });
    }

    render() {
        return (
            <div className="Game">
                <div className="Game-title">
                    <h1>Video Poker</h1>
                </div>

                <PlayArea
                    showResults={this.state.showResults}
                    cards={this.state.curDraw}
                    held={this.state.held}
                    hold={this.toggleHold}
                    drawCards={this.drawCards}
                    newGame={this.newGame}
                    drawsLeft={this.state.drawsLeft}
                    bank={this.state.bank}
                    wager={this.state.wager}
                    winnings={
                        score(this.state.curDraw).score * this.state.wager
                    }
                    updateWager={this.updateWager}
                    updateBank={this.updateBank}
                    reload={this.reload}
                />

                <RulesArea
                    wager={this.state.wager}
                    winningHand={score(this.state.curDraw).msg}
                />
            </div>
        );
    }
}
