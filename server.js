var express = require('express')
var app = express()
var exphbs = require('express-handlebars');
var helpers = require('./helpers/helpers.js');

var contracts =   [
    "Waiver Of Liability",
    "Rent To Own Contract",
    "Car Selling Contract",
    "House Rental Contract",
    "Payment Agreement Contract",
    "Personal Loan Contract",
    "Simple Contract",
    "Construction Contract",
    "Contract For Services Rendered",
    "Hair Salon Booth Rental Agreement",
    "General Contracting",
    "Land Sale Contract",
    "Investment Contract",
    "Employment Contract",
    "Car Rental Agreement"
  ];


app.engine('handlebars',
exphbs(
    {
          defaultLayout: 'main',
          helpers: helpers,
          partialsDir: __dirname + '/views/partials/'

    }));

app.set('view engine', 'handlebars');

app.use(express.static('public'))



app.listen(process.env.PORT || 3000, function () {
  console.log('yoyoyoy')
})

app.get('/', function(req, res)
{
  res.render('home',{selected: "home"});
});

app.get('/contracts', function(req, res)
{
  res.render('contracts',
  {
    selected: "contracts"

  });
});

app.get('/temp', function(req, res)
{
  res.send({templates: contracts});
});

app.get('/edit/:docId', function (req, res) {
  console.log(req.params);
  res.render('editor',{noNav: "editor",layout: 'editLayout',docId:req.params.docId});
});


app.get("/t",function(req,res){
    res.render('test',{selected: "test",layout: 'editLayout'});
});
