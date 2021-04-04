var express = require('express');
var app = express();
var port = 3000;
 
app.use(express.static('public'))
 
app.get('/', function (req, res) {
 res.sendFile('public/index.html')
})

app.listen(port, () => {
 console.log(`App listening at http://localhost:${port}`)
})
