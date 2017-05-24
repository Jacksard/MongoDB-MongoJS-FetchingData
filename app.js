var express = require ("express");
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongojs = require('mongojs')
var db = mongojs('practice', ['customers']);

//initiate app


var app = express();


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.get('/', function(req, res){
    db.customers.find(function(err, docs){
        console.log(docs);
    res.render('index',  {
        title: 'Customers',
        users: docs
        
    });
   
  
    });
})


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
