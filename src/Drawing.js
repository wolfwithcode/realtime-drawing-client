import React, { Component } from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine } from './api'

export default class Drawing extends Component {
    handleDraw = (line) => {
        publishLine({
            drawingId: this.props.drawing.id,
            line,
        });
    }

    render() {
        return (this.props.drawing) ? (
            <div
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas 
                    drawingEnable={true} 
                    onDraw={this.handleDraw}
                />
            </div>
        ) : null;
    }
}
