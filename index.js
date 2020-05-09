var express = require('express');
var app = express();
var path = require('path');

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.use(express.static('./content/'));

app.get('*', asyncMiddleware(async function (req, res) {
    console.log("home");

    res.sendFile(path.join(__dirname + "/content/html/index.html"));
}));

  
app.listen((process.env.PORT || 8000));