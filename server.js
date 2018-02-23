

var express = require('express');
var hash = require('object-hash');
var app = express()
//this is middleware for prevent unAuth users 
// app.use(function (req, res, next) {
//   if(true){
//     next()
//   }
//   else{
//     console.log('Time:', Date.now())
//     res.send("pleaselogin")

//   }
 
// })
var login = require("./auth/login")(app);
var register = require("./auth/signup")(app);
var weaponsadd = require("./Customize/weapons")(app);
var gameinfo = require("./GameInfo/gameinfo")(app);
var match = require("./Customize/match")(app);
var mysql = require('mysql');
var load = require('./config.js');
var logger = require("./logger/logger");

var connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
});
//test comment

//handle mysql connection lost
function handleDisconnect() {
  connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
}); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();



app.get('/', (req, res) => {
  //  var hashobj = hash(["includeamin","9518867"]);

    connection.query("select * from users",function(err,rows,fields) 
    {
      if(err){
        res.send(err);
      }
      else{
        res.send(rows);
      }
      
    })
    logger.log("Get Request  to main path");
   // res.send("US GAME");
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

