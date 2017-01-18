var express = require('express')
var app = express()
var exphbs = require('express-handlebars');

helpers = {
  isActive: function(a,b)
  {
    if(a==b)
     return "active";
    return "";
  }
}


app.engine('handlebars',exphbs({defaultLayout: 'main',helpers: helpers})); app.set('view engine', 'handlebars');

app.use(express.static('public'))



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function(req, res)
{
  res.render('home',{selected: "home"});
});

app.get('/contracts', function(req, res)
{
  res.render('contracts',{selected: "contracts"});
});
