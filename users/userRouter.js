const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  users.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error)
    next(error)
  })
});

router.get('/:id', (req, res, next) => {
  // do your magic!
  const {id} = req.params;
  users.getById(id)
  .then(user => {
    if (user) {
    res.status(200).json(user)
    } else {
      // res.status(404).json({
      //   messsage: "Unable to find the user by that id"
      // })
     next({code: 404, message: 'Unable to find the user by that id'})
    }
  })
  .catch(error => {
    console.log(error)
    next({code: 500, message: 'Sorry, unable to perform that operation'})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// router.use(error, req, res, next => {
//   // console.log(err.stack)
//   res.status({code: error.status}).json({message: error.message})
// }) 

router.use((error, req, res, next) => {
  res.status(error.code).json({message: error.message})
})

// (err, req, res, next) {
//   console.error(err.stack)
//   res.status(err.status || 500).send({
//     err: {
//       status: err.status || 500,
//       message: error.message || "Internal Server Error"
//     }
//   })
// }

module.exports = router;
