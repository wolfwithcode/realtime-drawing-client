import React, { Component } from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine, subscribeToDrawingLines } from './api'

export default class Drawing extends Component {

    state = {
        lines: [],
    };

    handleDraw = (line) => {
        publishLine({
            drawingId: this.props.drawing.id,
            line,
        });
    }

    componentDidMount(){
        subscribeToDrawingLines(this.props.drawing.id, (line) => {
            this.setState( (prevState) => {
                return {
                    lines: [...prevState.lines, line],
                };
            });
        });
    }

    render() {
        return (this.props.drawing) ? (
            <div
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas 
                    drawingEnabled={true} 
                    onDraw={this.handleDraw}
                    lines={this.state.lines}
                />
            </div>
        ) : null;
    }
}
