/*
Build a digital variation of the attendance list that existed in the classroom.

Requirement:
Data shall be stored in a database (MongoDB)
You should use Mongoose to create schedule and model for the data.
Appearance means nothing in this task.
Submitted (mailed) to hans.andersson@zocom.se by October 26th.

Function:
At the address "http: // localhost: 3000" the following should be done:
Users should select their name in a drop-down menu and click one of the "Come" or "Gick" buttons.
This data should then be stored in the database.

The address "http: // localhost: 3000 / admin" should be:
A list is printed with the people present at that time.
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//we require() modules from our routes directory.
var index = require('./routes/index'),
    users = require('./routes/users');

var app = express();
//mongoose--------------
/*
var mongoose=require('mongoose');
mongoose.connect('mongodb://imran:slutproject@clusterslutproject-shard-00-00-oyakj.mongodb.net:27017,clusterslutproject-shard-00-01-oyakj.mongodb.net:27017,clusterslutproject-shard-00-02-oyakj.mongodb.net:27017/[  ----collection name---  ]?
[  --option------->>>>]ssl=true&replicaSet=ClusterSlutproject-shard-0&authSource=admin');
let db = mongoose.connection; 
*/
var mongoose=require('mongoose');
mongoose.connect('mongodb://imran:slutproject@clusterslutproject-shard-00-00-oyakj.mongodb.net:27017,clusterslutproject-shard-00-01-oyakj.mongodb.net:27017,clusterslutproject-shard-00-02-oyakj.mongodb.net:27017/students?ssl=true&replicaSet=ClusterSlutproject-shard-0&authSource=admin');
let db = mongoose.connection; 

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//bring in the Shemas
let Students = require('./model/Schema');







// Home Route------------------
//route for index.pug
app.get('/', function(req, res){   
    
 Students.find({}, function(err, students) {
  if (err) throw err;
res.render('index', {
    students : students
})
  // object of all the users
  //console.log(students);
    });
});

//get singlle studentArticle
app.get('/students/:id', function(req, res){
    Students.findById(req.params.id, function(err, student){
        res.render('studentArticle',{
            student:student
        });
    });
        
});


//load edit form

app.get('/students/edit/:id', function(req, res){
    Students.findById(req.params.id, function(err, student){
        res.render('UpdateProxy',{
            student:student
        });
    });
        
});



//Update Submit Post Route

app.post('/students/edit/:id', function(res, req){
    
    let newstudent = {};
    student.name = req.body.name;
    student.class = req.body.class;
    student.pressence = req.body.pressence;
    
    let querry = {_id:req.prams.id}//here the querry is _id matches req.prams.id
    
   /* req.newData.username = req.user.username;
        MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { error: err });
            return res.send("succesfully saved");
        });*/

    Student.findOneAndUpdate(querry, newstudent, function(err){
        if(err){console.log(err);
               return;}
       /* else{
            res.redirect('/admin')
        }*/
    });
});





// route to show all students in admin
app.get('/admin', function(req, res, next){   

    Students.find({}, function(err, students) {
  if (err) throw err;
res.render('admin', {
    students : students
})
  // object of all the users
  //console.log(students);
    });
});
    









 //view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;


