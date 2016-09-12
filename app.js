var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
/*
* Create server for socket and get socket to use it
*/
var server = require('http').Server(app);
var io = require('socket.io')(server);
/*
* Tell the socket to listen to the server
*/
io.listen(server);
/*
* Load in the local modules
*/
Cube = require('./bin/cube_class');
Cube = new Cube();

/*
* Set update the socket data when a person connects
*/
io.on('connection', function (socket) {
    /*
    * Send message on connection
    */
    socket.emit('connected', {
        hello : "world"
    });
    /*
    * Update cube with new move
    */
    socket.on('piece_dropped', function(data) {
        /*
        * Get the layer that the piece was dropped in
        */
        var layer = Cube.cube[data.layer];
        /*
        * Check each row to find where the stack is
        */
        for(row in layer) {
            /*
            * look at the columm the piece was dropped on
            */
            if(layer[row][data.cell] == 0) {
                /*
                * Put the piece on the top of the stack
                */
                Cube.cube[data.layer][row][data.cell] = 1;
                break;
            } else {
                continue;
            }
        }
        /*
        * Send back the cube for game update
        */
        var jade = require('jade');
        jade.renderFile('views/cube.jade', {cube: Cube.cube }, function(err, html){
            // options are optional,
            // the callback can be the second arg
            socket.emit('cube_update', html);
            socket.broadcast.emit('cube_update', html);
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*
* Add the cube to the request so template can use it
*/
app.use(function(req,res,next) {
    req.cube = Cube.getCube();
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


/*
* Export server since since scope for socket is here
*/
//module.exports = app;
module.exports = {app: app, server: server};
