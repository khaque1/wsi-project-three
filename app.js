var compression = require('compression');
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var resultsRouter = require('./routes/results');

var app = express();

//Implementing gzip compression
app.use(compression());

// view engine setup
app.set("port",port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set paths to use
app.use(express.static('public'));
app.use('/api', express.static(path.join(__dirname, 'data')));
app.use('/index', indexRouter);
app.use('/results', resultsRouter);

//Route Prefixes
app.get('/', function(req, res) {
    res.render(path.join(__dirname, 'views'))
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
