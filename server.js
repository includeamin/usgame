

var express = require('express');
var mongodb = require('mongodb').MongoClient;
var app = express()

class test{
    constructor(name,lname,age){
        this.name = name;
        this.lname = lname;
        this.age = age;

    }
     getname() {
         return name;
        
    }
   }


app.get('/', (req, res) => {

    var array = []
    array.unshift('amin')
    array.unshift('reza')

    var amin  = new test("amin","jamal","22");
    console.log(amin);
    res.send(array);
    
});



app.listen(9000, () => {
    console.log(`Waepons Server started on port`);
});

