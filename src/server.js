const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("Бот запустился");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Сервер запустился");
  });
}

module.exports = keepAlive;
