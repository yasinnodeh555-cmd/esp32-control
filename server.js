const express = require("express");

const app = express();

let ledState = false;

// صفحه اصلی
app.get("/", (req, res) => {
    res.send(
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>ESP32 Control</title>

<style>

body {
    font-family: Arial;
    text-align: center;
    background: #111;
    color: white;
    padding-top: 60px;
}

button {
    font-size: 25px;
    padding: 20px 40px;
    margin: 10px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}

.on {
    background: #00c853;
    color: white;
}

.off {
    background: #d50000;
    color: white;
}

#status {
    margin-top: 30px;
    font-size: 25px;
}

</style>
</head>

<body>

<h1>ESP32 CONTROL</h1>

<button class="on" onclick="setLED('on')">
ON
</button>

<button class="off" onclick="setLED('off')">
OFF
</button>

<div id="status">
Loading...
</div>

<script>

async function setLED(state) {

    await fetch("/led/" + state);

    updateStatus();
}

async function updateStatus() {

    const response = await fetch("/status");

    const data = await response.json();

    if (data.led) {

        document.getElementById("status").innerHTML =
        "LED: ON";

    } else {

        document.getElementById("status").innerHTML =
        "LED: OFF";
    }
}

updateStatus();

setInterval(updateStatus, 3000);

</script>

</body>
</html>
);
});


// روشن
app.get("/led/on", (req, res) => {

    ledState = true;

    res.json({
        led: true
    });

});


// خاموش
app.get("/led/off", (req, res) => {

    ledState = false;

    res.json({
        led: false
    });

});


// وضعیت LED
app.get("/status", (req, res) => {

    res.json({
        led: ledState
    });

});


// پورت
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Server running on port " + PORT);

});
