import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.hold = this.hold.bind(this);
    }

    hold() {
        // this.setState({ held: !this.state.held });
        this.props.hold();
    }
    render() {
        const { cardSrc, alt, held } = this.props;
        return (
            <div className="Card">
                <img
                    className={!held ? "Card-img" : "Card-img Card-held"}
                    src={cardSrc}
                    alt={alt}
                />
                {this.props.drawsLeft > 0 ? (
                    <button className="Card-holdBtn" onClick={this.hold}>
                        HOLD
                    </button>
                ) : (
                    <button className="Card-gameOverBtn" disabled={true}>
                        Game Over
                    </button>
                )}
            </div>
        );
    }
}
