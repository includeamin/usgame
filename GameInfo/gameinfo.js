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
module.exports = function(app){
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
app.get('/config', (req, res) => {
    connection.query("select * from gameinfo",(err,rows,fields)=>{
        if(err){
            console.log(err);
        }
        res.send(rows);
    });
});

}