

var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
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

 app.post('/game/match/endmatch', (req, res) => {
  try {
      //save match result an winner data
        var playerone = req.body.playerone;
        var playertwo = req.body.playertwo;
        var roomid = req.body.roomid;
        var playeroneCustomjson,playertwoCustomjson;
        var winnerId = req.body.winnerId;
        var winnerPoint = req.body.winnerId;
        
    // TODO : 
    //check from client side by request to server for checking username is exist or not
    //check if user not exist server-side or client-side
        connection.query("INSERT INTO match (`playerOneId`, `playerTwoId`,`roomId`) VALUES ('"+playerone+"', '"+playertwo+"','"+roomid+"');",(err)=>{
            if(err){
                console.log(err);
            }
        });
        //custom json should have a defult value
        //insert customjson of ech user
        connection.query("select customjson from users where username='"+playerone+"'",(err,rows,fields)=>{
            if(err)
               {
                   console.log(err);
               }

        
        });


    
    } catch (error) {
     
    }
      
 
 });


 app.post('/game/customize', (req, res) => {
     try {


        var username = req.body.username;
        var customjson = req.body.customjson;
        

        connection.query("select id, customjson from users where username='"+ username+"'",
        function(err,rows,fields){
        if(err){
            console.log(err);
            logger.log(err);
        }
         else{
            connection.query("INSERT INTO `us`.`customhistory` (`userid`, `customjson`) VALUES ('"+rows[0].id+"', '"+rows[0].customjson+"');",(err)=>{
                if(err){
                    console.log(err);
                }
       
                })
         }
       
        });


        connection.query("UPDATE `users` SET `customjson`='"+
        customjson
        +"' WHERE `username`='"+username+"';",(err)=>{
            if(err){

                console.log(err);
                res.send(new customresponse(err));
                
            }

        });
        res.send(new customresponse("OK"));

      

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