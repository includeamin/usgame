

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
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/game/match/startmatch', (req, res) => {

        var playerId = req.body.playerId;
        var roomId = req.body.roomId;
        var customJson = req.body.customJson;
        var isMaster = req.body.isMaster;

    });





}