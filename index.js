const express = require("express");
// const ejs = require("ejs");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("Home", {
    cityLocation: "",
    weather: "",
    // weatherIcon: "",
    condition: "",
    humidityCount: "",
    windSpeed: "",
  });
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "7067f04422e710014df462aa100c2848";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, (resposne) => {
    console.log(resposne.statusCode);

    resposne.on("data", (data) => {
      const WeatherData = JSON.parse(data);
      //   console.log(WeatherData);
      const LocationName = WeatherData.name;
      const weatherDesc = WeatherData.weather[0].description;
      const weatherTemp = WeatherData.main.temp;
      const weatherHum = WeatherData.main.humidity;
      const weatherWind = WeatherData.wind.speed;
      const icon = WeatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //   http://openweathermap.org/img/wn/10d@2x.png
      //   res.write(imageURL);
      //   console.log(weatherHum);
      //   console.log(weatherWind);
      res.render("Home", {
        cityLocation: LocationName,
        weather: weatherTemp,
        // weatherIcon: imageURL,
        condition: weatherDesc,
        humidityCount: weatherHum,
        windSpeed: weatherWind,
      });
      res.send();
    });
  });
});

app.listen(8000, () => {
  console.log("Server running...");
});
