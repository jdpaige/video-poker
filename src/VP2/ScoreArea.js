import React, { Component } from "react";

export default class ScoreArea extends Component {
    render() {
        return <div>Bank: ${this.props.credits}</div>;
    }
}
