
var mqtt = require('mqtt')

var load = require('../config.js');
require('ssl-root-cas').inject();




module.exports ={

  

  log:function(string){
    
     var client  = mqtt.connect(load.logServer().host,{ rejectUnauthorized: false });
 //   console.log(load.logServer().host+load.logServer().port)
      client.subscribe('uslog')
   
      client.publish("uslog",string);
     
  }

}