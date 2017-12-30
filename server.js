

var express = require('express');
var app = express()

app.get('/', (req, res) => {

    res.send("this is usgame server");
});


app.listen(process.env.PORT || 9000, () => console.log("Listen on port 9000 --["+process.env.PORT+"]"));

