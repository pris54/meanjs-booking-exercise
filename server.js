// Paula Molinero (2016)

// Set up ======================================================================

var express         = require('express');
var app             = express();
var port  	        = process.env.PORT || 3001;
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// configuration ===============================================================

mongoose.connect('mongodb://localhost:27017/test');
console.log(mongoose.connection.readyState);

// Configuration ===============================================================

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));


// Define DB model =============================================================
var Booking = mongoose.model('Booking', {
    name : String,
    surname: String,
    bookingDate: { type: Date, default: Date.now },
    howMany : Number,
    email : String,
    phone : String,
    checkedIn: { type: Boolean, default: false }
});

// Routes ======================================================================

// Create booking
app.post('/api/booking/create', function(req, res) {
    console.log('REQ.BODY CREATE', req.body);
    Booking.create({
        name : req.body.name,
        surname : req.body.surname,
        bookingDate : req.body.bookingDate,
        howMany : req.body.howMany,
        email : req.body.email,
        phone : req.body.phone,
        checkedIn : false
    }, function(err, booking) {
        if (err) {
            res.send(err);
        }
    });
});

// List bookings
app.get('/api/booking/list', function(req, res) {
    Booking.find(function(err, booking) {
        if (err) {
            res.send('ERROR: ' + err);
        }
        res.json(booking);
    });
});

// Edit booking
app.put('/api/booking/edit/:_id', function(req, res) {
    console.log('REQ.PARAMS_ID', req.params._id);
    Booking.findById(req.params._id, function(err, booking) {
        if (err) {
            console.log('ERROR', err);
            res.send('ERROR: ' + err);
        } else {
            booking.checkedIn = (booking.checkedIn !== true);

            booking.save(function (err) {
               if (err) {
                   console.log(err);
               } else {
                   res.json(booking);
               }
            });
        }
    });
});

// Find single booking
app.get('/api/booking/find/:_id', function(req, res) {
    console.log('REQ.PARAMS_ID', req.params._id);
    Booking.findById(req.params._id, function(err, booking) {
        if (err) {
            console.log('ERROR', err);
            res.send('ERROR: ' + err);
        } else {
            console.log('OK', booking);
            booking.checkedIn = (booking.checkedIn !== true);
            res.send(booking);
        }
    });
});

// Delete booking
app.delete('/api/booking/delete/:_id', function(req, res) {
    console.log('REQ.PARAMS_ID', req.params._id);
    Booking.remove({
        _id : req.params._id
    }, function(err, booking) {
        if (err) {
            res.send(err);
        }
    });
});

// Listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);
