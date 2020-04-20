require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { CLIENT_ORIGIN } = require('./config');
const app = express();
const habitRouter = require('./Habits/habits-router');
const entriesRouter = require('./Entries/entries-router');
const homeRouter = require('./Home/home-router');


const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use('/habits', habitRouter)
app.use('/entry', entriesRouter)
app.use('/home', homeRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: error.message, error } }
    } else {
        console.log(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app