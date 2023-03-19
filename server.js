const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

/** Cyton from OpenBCI to track EEG data
 *
 */
/*
const { spawn } = require("child_process");

const Cyton = require()

app.use(express.static('public'));

app.get("/result", (req, res) => {
    let metadata; // TODO: Read metadata from simulator or real device
    let dataToSend;
    const bciProcess = spawn("python", [
        "./algorithm/model.py",
        metadata
    ]);
    bciProcess.stdout.on("data", (data) => {
        console.log("Pipe data from python...");
        dataToSend = data.toString();
    });
    bciProcess.on('close', (code) => {
        console.log("Python script close all stdio with code ${code}");

    });
    res.json({
        message: "success",
        result: dataToSend,
    })
})

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

 */

app.use(express.static('public'));

app.get('/message', (req, res) => {
    res.send('Raspberry Pi BCI is accessed');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
