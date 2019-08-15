var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/reg', function(req, res){
    console.log(req);
    res.status(200).send("oke");
});

app.get('/', function(req, res){
    res.send("vce chetka")
})

app.listen(8080);