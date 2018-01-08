
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
class UserSignUp{
    constructor(username,mail,password,age){
        this.username=username;
        this.mail =mail;
        this.password=hash([username,password]);
        this.age=age;
    }
    insertToDb(){
       
        try {
          //check if exist username
            connection.query("insert into users (username,mail,password,age) values ('"+this.username+"','"+this.mail
            +"','"+this.password+"','"+this.age+"');",function(err){
                console.log(err);
                return "FAILD :"+err;
            });
            return "OK"
            
        } catch (error) {
            console.log(error);
            return "FAILD :"+error;
            
        }
        
        connection.release()

    }

    checkusername(){
        try {
            connection.query("select username from users where username="+this.username+" ",function(err,rows,fieldss){
               
               if(err) {
                   throw err;
                   console.log(err)
               }
               else{
                 if(rows.length > 0){
                     var ret = customresponse("username already exist");
                     return ret;
                 }
                 else{
                     return "OK";
                 }

               }
               connection.release()
               // console.log(err);
               // return "FAILD :"+err;
            });
        

            return "OK"
            
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
            var output= temp_user.insertToDb();
            var result = new customresponse(output);
            console.log("new user : "+username);
           
            res.send(result);
           

            
        } catch (error) {
           console.log(error);
           var result = new customresponse(output);
           res.send(result);
            
        }
       
        
        
    });

    

}