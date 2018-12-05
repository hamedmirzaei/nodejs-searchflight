
const path = require('path')
const http = require('http')
const fs = require('fs')
const express = require('express')
const layout = require('express-layout')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const helmet = require('helmet')
const csrf = require('csurf')

const routes = require('./routes')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middlewares = [
  helmet(),
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),
  csrf({ cookie: true })
]
app.use(middlewares)

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3001, () => {
  console.log('App running at http://localhost:3001')
})
