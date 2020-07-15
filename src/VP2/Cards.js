import React, { Component } from "react";
import Card from "./Card";
import "./Cards.css";

export default class Cards extends Component {
    render() {
        const cards = this.props.cards.map((card, index) => (
            <Card
                hold={() => this.props.hold(index)}
                held={this.props.held[index]}
                drawsLeft={this.props.drawsLeft}
                cardSrc={card.image}
                card={card.code}
                alt={`${card.value} of ${card.suit}`}
                key={card.code}
            />
        ));
        return <div className="Cards">{cards}</div>;
    }
}
