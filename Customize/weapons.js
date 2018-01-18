
var mysql = require('mysql');
var load = require('../config.js');
var hash = require('object-hash');
var empty = require('is-empty');
var customRespon = require("../CustomRespon");
const express = require('express');
const app = express();
var connection = mysql.createConnection({
    host: load.dbConfig().host,
    user: load.dbConfig().user,
    password: load.dbConfig().password,
    database: load.dbConfig().database
});



module.exports = function(app){
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/weapons/add', (req, res) => {
 
        try {
            
            console.log("[%s] ----------------------------------",new Date().toISOString())

            console.log("Add new Weapons")
            var Model = req.body.Model;
            var Type = req.body.Type;
            var Ranget = req.body.Range;
            var Damage = req.body.Damage;
            var FireRate = req.body.FireRate;
            var ReloadTime = req.body.ReloadTime;
            var Accuracy = req.body.Accuracy;
            var MagazineSize = req.body.MagazineSize;

            connection.query(
            "INSERT INTO `"+load.dbConfig().database+"`.`weapons` (`Model`, `Type`, `Range`, `Damage`, `FireRate`, `ReloadTime`, `Accuracy`, `MagazineSize`) VALUES ('"+Model+"', '"+Type+"', '"+Ranget+"', '"+Damage+"', '"+FireRate+"', '"+ReloadTime+"', '"+Accuracy+"', '"+MagazineSize+"');",function(err){
            
            if(err) console.log(err);
             

            });
            console.log("New Weapon : added")
            var respon = new customRespon("OK");
            res.send(respon);

        } catch (error) {
             console.log("adding weapon faild :"+error);
             var respon = new customRespon(error);
             req.send(respon);

        }
       

       

    });


}