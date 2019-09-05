var express = require('express');
var app = express();
var sql = require('mssql');

var config = {
    server: '172.16.12.30',
    database: 'Practise',
    user: 'sa',
    password: 'Bao8842553',
    port: 1433
};

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/studies', function (req, res, next) {
    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from Student', function (err, recordset) {
        
        // if (err) console.log(err)
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(recordset));
        
        // res.json({
        //     data: recordset
        // });
        // sql.close();
        if(err) console.log(err);
        res.send(recordset)
    });
});

var server = app.listen(4000, function () {
    sql.connect(config, function (err) {
        try{
            if (err) throw err;
        }catch(err){
            console.log(err);
            sql.close();
        };        
    });    
    console.log('Server is running..');
});