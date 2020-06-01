const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
const rateLimitter = require('express-rate-limit');
const slowDown = require('express-slow-down');
const xss = require('xss-clean');
const expressSanitizer = require('express-mongo-sanitize');
const helmet = require('helmet');

const { create, update, login, signup, middleware, remove, getAll, getAllTasks } = require('./contoller');

const limiter = rateLimitter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each PC to 100 requests per windowMs
});
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // allow 100 requests per 15 minutes,
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request  101 is delayed by  500ms
    // request  102 is delayed by 1000ms
});

app.use(express.json())
app.use(helmet());
app.use(speedLimiter);
app.use(limiter);
app.use(expressSanitizer());
app.use(xss());
app.use(cookieparser())
app.post('/api/v1/signup', signup)
app.post('/api/v1/login', login)
app.use(middleware)
app.post('/api/v1/createTask', create)
app.patch('/api/v1/updateTask', update)
app.get('/api/v1/getAllTasks', getAll)
app.delete('/api/v1/deleteTask', remove)
const port = process.env.PORT || 80
app.listen(port, function () {
    console.log("Server listening at port " + port)
})