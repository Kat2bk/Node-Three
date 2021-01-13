const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();
server.use(express.json())

server.use(logger)

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} Request made to: ${req.url} at ${time}`);
  next();
}

// validate User ID

// validate User

// validate Post

module.exports = server;
