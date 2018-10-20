const express = require("express");
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express();
app.use(redirectToHTTPS([/localhost:(\d{4})/, /127.0.0.1:(\d{4})/], [], 301));
app.use("/", express.static(__dirname + '/../'));
app.use("/new/:type", express.static(__dirname + '/../'));
app.use("/qr/:id", express.static(__dirname + '/../'));
app.use("/:id/edit", express.static(__dirname + '/../'));
app.use("/login/:service", express.static(__dirname + '/../'));
app.use("/login", express.static(__dirname + '/../'));

app.listen(process.env.PORT || "8000", () => {
    console.log("Port: 8000");
});