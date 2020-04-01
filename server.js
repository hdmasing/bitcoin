const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname+ "/index.html");
})

app.post('/', function(req, res){
    let currency = req.body.currency;
    let url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

   request(url, function(error, response, body){
       let data = JSON.parse(response.body);
       let price;
       let num= Number(req.body.number1);
      
       if(currency === "EUR"){
           price=data.bpi.EUR.rate_float;
           res.send(`${num} Bitcoins is ${price * num} Euros`);
       }else{
           price=data.bpi.USD.rate_float;
           res.send(`${num} Bitcoins is ${price * num} Dollars`);
       }
    })  
})

app.listen(process.env.PORT || 3000, function(){

	console.log("Server has started.");

})