var express    = require('express')
    , bodyParser = require('body-parser')
    , cors       = require('cors')
    , mongoJS    = require('mongojs')
    , port       = 3000
    ;

var db = mongoJS('movies', ['mymovies']);

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send('movies!');
});

app.get('/movie/:id', function(req, res) {
    console.log(req.params.id);
    db.mymovies.find({ _id: mongoJS.ObjectId(req.params.id) }, function(err, result) {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.get('/title/:title', function(req, res) {
    db.mymovies.find({ title: req.params.title }, function(err, result) {
        if (err) return console.log('err', err);
        console.log('result', result);
        res.send(result);
    });
});

app.get('/movies', function(req, res) {
    db.mymovies.find({}, function(err, result) {
        if (err) return console.log('err', err);
        console.log('result', result);
        res.send(result);
    });
});

app.post('/movie', function(req, res) {
    db.mymovies.save(req.body, function(err, result) {
        if (err) return console.log('err', err);
        res.send('sucessfully created');
        console.log(result);
    });
});

app.listen(port, function(err) {
    if (err) return console.log(err);
    console.log('app is listening on port: ' + port);
});