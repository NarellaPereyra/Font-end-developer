var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//consulta a base de datos
/*select
pool.query("select * from empleados").then(function(resultados){
  console.log(resultados)
});*/

/*insert
var obj = {
  nombre: 'Marta',
  apellido: 'Ruíz',
  trabajo: 'Programadora',
  edad: '29',
  salario: '8500',
  mail: 'martaruiz@gmail.com'
}

pool.query('insert into empleados set ?',[obj]).then (function (resultados){
  console.log (resultados)
});*/

/*delete
var id_emp = 26;
pool.query('delete from empleados where id_emp = ?', [id_emp]).then(function (resultados){
  console.log(resultados)
});*/

/*update*/
var id_emp = 25
var obj = {
  nombre: 'Leandro',
  apellido: 'Rodriguez',
  trabajo:'Especialista Multimedia',
  edad: '48',
  salario:'9000',
  mail: 'learod@gmail.com'
}

pool.query('update empleados set ? where id_emp = ?', [obj, id_emp]). then(function(resultados){
  console.log(resultados)
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
