const express = require("express")
const path = require("path")
const logger = require("morgan")
const cors = require("cors")
const createError = require('http-errors');

const cookieParser = require("cookie-parser")

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin:"https://code-sphere-frontend-hmpi.onrender.com"
}))
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


app.use('/', indexRouter)
app.use('/users', userRouter)

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.send('error');
  });

  
  
  module.exports = app;
