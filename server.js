

var express = require('express');
var app = express()

app.get('/', (req, res) => {

    res.send("this is usgame server");
});


app.listen(9000, () => {
    console.log(`Waepons Server started on port`);
});

