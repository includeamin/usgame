

var express = require('express');
var hash = require('object-hash');
var app = express()
var login = require("./auth/login")(app);
var register = require("./auth/signup")(app);
var weaponsadd = require("./Customize/weapons")(app);
var mysql = require('mysql');
var load = require('./config.js');
var connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
});
//test comment

app.get('/', (req, res) => {
    var hashobj = hash(["includeamin","9518867"]);
    res.send("US GAME");
    // connection.query("select * from users where username='includeamin'",function(err,rows,fields){
    //     if(err) throw err;
    //     //console.log(rows);
    //     if (isEmptyObject(rows)) {
    //         res.send("not found");
    //         console.log("not found")
    //       } else {
    //         res.send("found");
    //         console.log("found")

    //       }
      

    // });
});
function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

app.listen(process.env.PORT || 9000, () => console.log("Listen on port 9000 --["+process.env.PORT+"]"));

