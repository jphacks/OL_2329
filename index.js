const express = require("express");
const PORT = 4000;
const http = require("http");

// Expressアプリとサーバーを作成
const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs"); // テンプレートエンジンを設定
app.set("views", __dirname + "/views"); // テンプレートファイルの場所を設定

app.use(express.static("views"));

app.get("/", (req, res) => {
    res.render("app.ejs");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
