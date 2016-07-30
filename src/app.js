var express = require('express');
var swig = require('swig');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var server = require('nexus.io').server(io);

app
.engine('html', swig.renderFile)
.set('view cache', false)
.set('view engine', 'html')
.set('views', __dirname+'/../web/views/templates')
.get('/', function (req, res) {
    res.render('index.html', {title: 'Nexus'})
})
.get('/detect', function (req, res) {
    res.render('detect.html', {title: 'Detection'})
})
.use(express.static(__dirname+'/../web/static'))
.use('/partials', express.static(__dirname+'/../web/views/partials'));

http.listen(process.env.PORT || 8080, process.env.YOUR_HOST || '0.0.0.0', function (){
    console.log('listening on http://localhost:'+http.address().port);
});
