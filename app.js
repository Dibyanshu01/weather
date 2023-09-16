const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
 
});

app.post("/",function(req,res){

    const apiKey="664c2da9251ff9a31d1a8641dbf0730f";
    const query= req.body.cityName;
    const unit="metric";
    const url = ("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit);

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const tempreture = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The current weather condition is " + weatherDescription + " .</p>");
            res.write("<h1>The tempreture in "+query+" is " + tempreture + " degree celcius .</h1>");
            res.write("<img src="+ imageURL + ">");
            res.send();
            
        });
    });
});




app.listen(2000,function(){
    console.log("server is running on port 2000");
});