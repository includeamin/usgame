var fs = require('fs');
module.exports = {
    dbConfig: function() {
        console.log('loading  database File');
        let rawdata = fs.readFileSync('package.json');
        let database = JSON.parse(rawdata);
        return database.Database;
    }
    ,
    Mailconfig: function(){
        console.log('loading  mail File');
        let rawdata = fs.readFileSync('package.json');
        let database = JSON.parse(rawdata);
        return database.Mail;
    },
    logServer:function(){
      
        let rawdata = fs.readFileSync('package.json');
        let database = JSON.parse(rawdata);
        return database.logServer;

    }
};

