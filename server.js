var express = require('express')
var app = express()
var exphbs = require('express-handlebars');


app.engine('handlebars',exphbs({defaultLayout: 'main'})); app.set('view engine', 'handlebars');

app.use(express.static('public'))



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function(req, res)
{
  res.render('hello');   // this is the important part
});
