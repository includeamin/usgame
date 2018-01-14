
var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
var empty = require('is-empty');
const express = require('express');
const app = express();
var connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
});

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
class UserSignUp{
    constructor(username,mail,password,age){

        this.username=username;
        this.mail =mail;
        this.password=hash([username,password]);
        this.age=age;
    }

    checkusername(callback){
        try {
        
           
      connection.query("SELECT username , mail FROM users WHERE username='"+this.username+"' or mail='"+this.mail+"'", function(err,rows,fields){
            
               if(err) {
                   throw err;
                   console.log(err)
                   callback(err,err.code);
               }
             
               if(!empty(rows)){
                   callback(null,"username or mail address  already exist");
                
         
            }
            else{
             
                callback(null,"OK");
            }
         
            });
           
        } catch (error) {
            console.log(error);
            return "FAILD :"+error;
        }
    }


    
}

module.exports = function(app){

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/users/register', (req, res) => {
        try {

            var username = req.body.username;
            var mail = req.body.mail;
            var password = req.body.password;
            var age = req.body.age;

   
    
            var temp_user = new UserSignUp(username,mail,password,age);
            
            temp_user.checkusername(function(err,result){
                if(err){
                    console.log(err);
                }
                
                if(result =="OK"){
                    connection.query("insert into users (username,mail,password,age) values ('"+username+"','"+mail
                    +"','"+password+"','"+age+"');",function(err){
                      if(err){
                          console.log(err);

                      }
                    });
                    console.log("New User Registration : UserName : %s , Mail : %s  " ,username,mail);
                    res.send(new customresponse(result));
                }
                else{
                    console.log("New User Registration faild  :"+ result);
                    res.send(new customresponse(result));
                }
                
                

            });

         
           

            
        } catch (error) {
           console.log(error);
           var result = new customresponse(output);
           res.send(result);
            
        }
       
        
        
    });

    app.post('/test', (req, res) => {

        var username = req.username;
        var temp_user = new UserSignUp(username);
        temp_user.checkusername();
        
    });

    

}