

var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
var empty = require('is-empty');
const express = require('express');
var logger = require("../logger/logger");

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
            this.Message=OK;

        }
        this.Message=OK;
    }

}

module.exports = function (app) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

 app.post('/game/match/adddetails', (req, res) => {
  try {
    
      //save match result an winner data
        var playerOne = req.body.playerone;
        var playerTwo = req.body.playertwo;
        var roomid = req.body.roomid;
        var detailsJson = req.body.detailsjson;
        console.log("adding game detail on ["+roomid+"]")

        connection.query("INSERT INTO `"+load.dbConfig().database+"`.`match` (`playerOne`, `playerTwo`, `roomId`, `detailsjson`) VALUES ('"+
        playerOne+"', '"+playerTwo+"', '"+roomid+"', '"+
        detailsJson+"');");
       res.send("Done");

    
    } catch (error) {
      console.log("error on adding matchdetails :"+error);
      res.send(error);
    }
      
 
 });


 app.post('/game/customize', (req, res) => {
     try {
          var username = req.body.username;
          var customjson = req.body.customjson;

     if(username == undefined || customjson==undefined){
         res.send(new customresponse("Username or customjson undefined"));
       }
     else{
         
        connection.query("select id, customjson from users where username='"+ username+"'",
        function(err,rows,fields){
        if(err){
            console.log(err);
            logger.log(err);
        }
         else{
             if(!empty(rows)){
                connection.query("INSERT INTO `us`.`customhistory` (`userid`, `customjson`) VALUES ('"+rows[0].id+"', '"+rows[0].customjson+"');",(err)=>{
                    if(err){
                        console.log(err);
                    }
           
                    })
                    // console.log(username);
                    // console.log(customjson);
                    connection.query("UPDATE `users` SET `customjson`='"+
                    customjson
                    +"' WHERE `username`='"+username+"';",(err)=>{
                        if(err){
            
                            console.log(err);
                            res.send(new customresponse(err));
                            
                        }
                        else{
                            res.send(new customresponse("OK"));
                        }
            
                    });
             }
             else{

                res.send(new customresponse("User not exist"));
              

                }

           
           }
       
        });


    
       

     }
       
        


      //edit

     } catch (error) {
         console.log(error);
        res.send(new customresponse(error));

     }
    
 });
 app.get('/game/getcustomize', (req, res) => {
     try {
         var username = req.query.username;
         var roomid = req.query.roomid;
         connection.query("select username , customjson from users where username='"+username+"'",(err,rows,fields)=>{

         if(err){
            logger.log(format("Query for customjson in match faild : {}",err));
        //    console.log(format("Query for customjson in match faild : {}",err));
         }
         else{
            res.send(rows);
            logger.log(format("room id: [{}] |Query for customjson in match success : username: {}",roomid,username));
          //  console.log(format("room id: [{}] |Query for customjson in match success : username: {}",roomid,username));
         }


         });

     } catch (error) {
        logger.log(format("Query for customjson in match faild : {}",error));
    //    console.log(format("Query for customjson in match faild : {}",error));
     }
     
 });

 //hanlding end match by inserting game result to database

}