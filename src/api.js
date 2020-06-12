import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx'
const socket = openSocket('http://localhost:8000');

function subscribeToDrawings(cb){
    socket.on('drawing', drawing => cb(drawing));
    socket.emit('subscribeToDrawings');
}

function createDrawing(name){
    socket.emit('createDrawing', {name});
}

function publishLine({drawingId, line}){
    socket.emit('publishLine', {drawingId, ...line});
}


function subscribeToDrawingLines( drawingId, cb ){

    const lineStream = Rx.Observable.fromEventPattern(
        h => socket.on(`drawingLine:${drawingId}`, h),
        h => socket.off(`drawingLine:${drawingId}`, h)
    );

    const bufferTimeStream = lineStream
    .bufferTime(100)
    .map(lines => ({lines}));

    bufferTimeStream.subscribe(linesEvent => cb(linesEvent));


    // socket.on(`drawingLine:${drawingId}`, cb);
    socket.emit('subscribeToDrawingLines', drawingId);
}

export {
    createDrawing,
    subscribeToDrawings,
    publishLine,
    subscribeToDrawingLines,
};