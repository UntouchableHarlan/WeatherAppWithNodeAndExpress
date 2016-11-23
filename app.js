'use strict'

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var apiKeys = "4d2543984b794162371361cfa829739c";

function includeCloud(sentence) {
  if (sentence.includes("clouds")) {
      // var img = document.getElementById('weather-image');
      // img.setAttribute('src', __dirname + '/src/public/images/cloud.png')
  }
}

app.use('/static', express.static(__dirname + '/src/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/templates');


app.get('/', function(req, res) {
  // res.send('Hello World')
  // send the ejs
  res.render('weather');
});

app.post('/grab-weather', function(req, res) {
  var userCity = req.body.weather;
  var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&APPID=" + apiKeys
  // console.log(url);
  // console.log(req.body.weather);

  request(url, function(err, response, body) {
    if (!err) {
      // console.log(res)
      var b = JSON.parse(body)
      console.log(b.list[0].weather);
      console.log(b.list[0].main.temp);

      var todayTemp = Math.round(parseInt(b.list[0].main.temp) * 1.8 - 459.67);
      console.log(todayTemp);

      var tomorrowTemp = Math.round(parseInt(b.list[1].main.temp) * 1.8 - 459.67);
      console.log(tomorrowTemp);

      var nextDayTemp = Math.round(parseInt(b.list[2].main.temp) * 1.8 - 459.67);
      console.log(nextDayTemp);

      var todayMinTemp = Math.round(parseInt(b.list[0].main.temp_min) * 1.8 - 459.67);
      console.log(todayMinTemp);

      var tomorrowMinTemp = Math.round(parseInt(b.list[1].main.temp_min) * 1.8 - 459.67);
      console.log(todayMinTemp);

      var nextDayMinTemp = Math.round(parseInt(b.list[2].main.temp_min) * 1.8 - 459.67);
      console.log(nextDayMinTemp);

      var todayMaxTemp = Math.round(parseInt(b.list[0].main.temp_max) * 1.8 - 459.67);
      console.log(todayMaxTemp);

      var tomorrowMaxTemp = Math.round(parseInt(b.list[1].main.temp_max) * 1.8 - 459.67);
      console.log(tomorrowMaxTemp);

      var nextDayMaxTemp = Math.round(parseInt(b.list[2].main.temp_max) * 1.8 - 459.67);
      console.log(nextDayMaxTemp);

      var desc = b.list[0].weather[0].main
      console.log(desc);

      var city = req.body.weather

      res.render('weatherResult', {todayTemp, tomorrowTemp, desc, city, todayMinTemp, tomorrowMinTemp, todayMaxTemp, tomorrowMaxTemp, nextDayTemp, nextDayMinTemp, nextDayMaxTemp});
    } else {
      console.log(res);
      console.log(err);
    }
  });
})

app.listen(3000, function() {
  console.log('front end server running on 3000');
});
