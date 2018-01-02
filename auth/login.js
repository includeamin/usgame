
var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
const express = require('express');
const app = express();
var connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


module.exports = function (app) {
   
    app.get('/users', (req, res) => {
        var username = req.query.username;
        var password = req.query.password;
        // var gamevresion = req.query.gamevresion;
        // var clientvresion = req.query.clientvresion;

        var hashobj = hash([username,password]);

        connection.query("select * from users where username ='"+username+"'",function(err,rows,fields){
            console.log(rows)

            if(isEmptyObject(rows))
            {   
                res.send("USER NOT FOUND");
            }
            else{
                if(rows[0].password == password){
                    res.send("OK");
                }
                else{
                    res.send("password is wrong");
                }
            }
            // else{
            //     connection.query("select password from users where username ='"+username+"' and password ='"+hashobj+"'",function(err,rows,fields){
            //         if(isEmptyObject(rows))
            //         {
            //             res.send("password is wrong ");
            //         }
            //         else
            //         {
            //          res.send("OK");
            //         }
        
            //     });
            // }

        });
      

        
    });


    function isEmptyObject(obj) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
          }
        }
        return true;
      }


}