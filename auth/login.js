
var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
var logger = require("../logger/logger");
const express = require('express');
var format = require('string-format')
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


class customresponse{
    constructor(OK){
        if(OK =="OK")
        this.ResultCode=1;
        else{
            this.ResultCode = 2;
        }
        this.Message=OK;
    }

}
module.exports = function (app) {
   
    app.get('/users', (req, res) => {
        console.log("[%s] ----------------------------------",new Date().toISOString())
        var username = req.query.username;
        var password = req.query.password;
        var gamevresion = req.query.gamevresion;
      //  var clientvresion = req.query.clientvresion;

        var hashobj = hash([username,password]);

        connection.query("select * from users where username ='"+username+"'",function(err,rows,fields){
          //  console.log(rows) 
            console.log("user [%s] loggin in.",username)
            logger.log(format('user [{}] loggin in.', username))
            
            if(err){
                console.log(err);
                logger.log(err);
            }

            if(isEmptyObject(rows))
            {    console.log("user [%s] login faild : Username not found.",username)

                 logger.log(format("user [{}] login faild : Username not found.",username));
            
                 var result = new customresponse("USER NOT FOUND");

                res.send(result);
            }
            else{
                if(rows[0].password == hashobj){
                    console.log("user [%s] login Successful.",username);
                    logger.log(format("user [{}] login Successful.",username));
                    var result = new customresponse("OK");
                    res.send(result);
                }
                else{
                    console.log("user [%s] login faild :password is wrong.",username);
                    logger.log(format("user [{}] login faild :password is wrong.",username));

                    var result = new customresponse("password is wrong");

                    res.send(result);
                }
            }
            

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