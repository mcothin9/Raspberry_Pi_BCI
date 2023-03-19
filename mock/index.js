const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const brainflow = require('brainflow');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const BoardShim = brainflow.BoardShim;
const BrainFlowInputParams = brainflow.BrainFlowInputParams;
const BoardIds = brainflow.BoardIds;

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Client connected');

    const params = new BrainFlowInputParams();
    params.serial_port = null;
    // Set your BrainFlow device-specific parameters here
    // e.g., params.serial_port = 'COM3';

    const boardId = BoardIds.SYNTHETIC_BOARD; // Change this to the ID of your board
    const board = new BoardShim(boardId, params);

    board.prepare_session()
        .then(() => {
            console.log('Session prepared');
            return board.start_stream();
        })
        .then(() => {
            console.log('Stream started');
            board.start_background_acquisition((data) => {
                socket.emit('eeg-data', data);
            });
        })
        .catch((err) => {
            console.error(err);
        });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        board.stop_background_acquisition();
        board.stop_stream();
        board.release_session();
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
