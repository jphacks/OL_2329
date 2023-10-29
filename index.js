const express = require("express");
const PORT = 4000;
const http = require("http");

// Expressアプリとサーバーを作成
const app = express();
const server = http.createServer(app);
const axios = require('axios');
const { receiveMessageOnPort } = require("worker_threads");
const { ReceiverAuthenticityError } = require("@slack/bolt");
const bodyParser = require('body-parser');

app.set("view engine", "ejs"); // テンプレートエンジンを設定
app.set("views", __dirname + "/views"); // テンプレートファイルの場所を設定

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const slackEndpoint = 'https://storm-vagabond-salsa.glitch.me/slack/events/get'; // SlackのエンドポイントURL
const receivedMessage = []
let sum = 0;
app.get("/", (req, res) => {
    res.render("app.ejs");
    // res.status(200).json("Welcome!!, your appSlack is working well");
});

app.get("/home", (req, res) => {
    let sum = 0;
    receivedMessage.forEach(item => {
      sum += parseInt(item.num);
    })
    res.status(200).json(sum);

});

// メッセージを受け取るエンドポイントの設定
app.post('/receive-message', (req, res) => {
    try {
      const text = req.body;
      receivedMessage.push(text);
      res.status(200).send('Data received and saved');
    } catch (error) {
      console.error('Error receiving and saving data:', error);
      res.status(500).send('Error receiving and saving data');
    }
  
    });
app.get('/display-messages', (req, res) => {
    try {
      message = receivedMessage
      res.status(200).send(receivedMessage);
    } catch (error) {
      console.error('Error displaying messages:', error);
      res.status(500).send('Error displaying messages');
    }
  });    

app.get('/receive-message', (req, res) => {
    let sum1 = 0;
    receivedMessage.forEach(item => {
      
        sum1 += parseInt(item.num);
  })
  res.status(200).json(sum1);
    // res.status(200).json('successfully');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
