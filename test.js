const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 8000

app.get('/', (req, res) => {
    let dataToSend;
    const python = spawn('python', ['./algorithm/model.py']);

    python.stdout.on('data', function (data) {
        console.log('Pipe data from Python');
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    python.on('close', (code) => {
        console.log('Chile process close all stdio with code ${code}');
    })
});

app.listen(port, () => {
    console.log('Listen to ${port}...');
});