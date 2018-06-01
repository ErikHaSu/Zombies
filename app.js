var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var entries=[];
app.locals.entries = entries;
var IP_NEGADA = '123.23.43.0';

app.set('views',path.resolve(__dirname,'views'));
app.set('view engine','ejs');

var publicPath = path.resolve(__dirname, 'public');
app.use('/recursos', express.static(publicPath));

app.get('/',(request,response) =>response.render('index'));

app.get('/clases',function(request,response){
    response.render("clases");
});
app.get('/armas',function(request,response){
    response.render("armas");
});

app.get('/new-entry',(request,response) => response.render('new-entry'));

app.get('/Victimas',function(request,response){
    response.render("Victimas");
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/armas',(request,response) =>response.render('armas'));

app.get('/new-entry',(request,response) => response.render('new-entry'));

app.post('/new-entry',(request,response) =>{
if(!request.body.title || !request.body.body){
    response.status(400).send('Las entradas deben de tener un titulo y un mensaje');
    return;
}
entries.push({
    title:request.body.title,
    body:request.body.body,
    created:new Date()
});
response.redirect('/armas');
});
app.use ((request,response) => response.status(404).render('404'));

http.createServer(app).listen(3000,() =>
console.log('La aplicacion zombies esta corriendo en el puerto 3000')
);
