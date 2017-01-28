var express = require('express')
var app = express()
var exphbs = require('express-handlebars');
var helpers = require('./helpers/helpers.js');
var contractsData = require('./helpers/ContractsData.js');

const PORT = 3000;

app.engine('handlebars',
exphbs(
    {
          defaultLayout: 'main',
          helpers: helpers,
          partialsDir: __dirname + '/views/partials/'

    }));

app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.listen(process.env.PORT || PORT, function () {
  console.log('App started at: http://localhost:'+PORT+'/')
})

app.get('/', function(req, res) { res.render('home',{selected: "home"}); });

app.get('/contracts', function(req, res) { res.render('contracts', {selected: "contractsData.getData()"}); });

app.get('/temp', function(req, res) { res.send({templates: contractsData.getData()}); });

app.get('/edit/:docId', function (req, res) {
  console.log(req.params);
  res.render('editor',{noNav: "editor",layout: 'editLayout',docId:req.params.docId});
});


app.get("/t",function(req,res){
    res.render('test',{selected: "test",layout: 'editLayout'});
});
