import React, { Component } from 'react';
import Canvas from 'simple-react-canvas';

export default class Drawing extends Component {
    render() {
        return (this.props.drawing) ? (
            <div
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas drawingEnable={true} />
            </div>
        ) : null;
    }
}
