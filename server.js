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
function validateUserID(req, res, next) {
  if (req.id) {
    req.user = req.id;
    next()
  } else {
    res.status(404).json({
      message: "there is no user with that id"
    })
  }
}


// validate User
function validateUser(req, res, next) {
  if (req.body) {
    next();
  } else if (req.body && !req.body.name) {
    res.status(400).json({
      message: "missing required name field"
    })
  } else{
    res.status(400).json({
      message: "Missing user data"
    })
  }
}

// validate Post
function validatePost(req, res, next) {
  if (req.body) {
    next()
  } else if (req.body && !req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    res.status(400).json({
      message: "missing post data"
    })
  }
}

// function logErrors (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('something broke, try again later!')
// }

module.exports = server;
