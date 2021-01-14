const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  users.insert(req.body)
  .then(post => {
    if (req.body) {
    res.status(201).json(post)
    } else if (!req.body) {
      next({code: 404, message: "please fill out all fields"})
    }
  })
  .catch(error => {
    console.log(error)
    next({code: 500, message: "Oops, something happened, try again"})
  })

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
  const {id} = req.params;
  users.getUserPosts(id)
  .then(post => {
    res.code(200).json(post)
  })
  .catch(error => {
    console.log(error)
    next({code: 500, message: 'sorry, unable to do that'})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  users.remove(id)
  .then(user => {
    res.status(204).json(user)
  })
  .catch(error => {
    console.log(error)
    next({code: 500, message: 'sorry, something happened, try again'})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const {name} = req.body;

  if (!id) {
    return next({code: 404, message: "That user does not exist"})
  } else if (!name) {
    return next({code: 400, message: "Please enter a name"})
  } else { // or maybe just users.update(req.params.id, req.body)
    users.update(id, name)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    console.log(error)
    next({code: 500, message: "Oops, something happened"})
  })
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if (req.user.id) {
    req.user = user
    next()
  } else {
    res.status(404).json({
      message: "Unable to find user"
  })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

// router.use(error, req, res, next => {
//   // console.log(err.stack)
//   res.code({code: error.code}).json({message: error.message})
// }) 

router.use((error, req, res, next) => {
  // console.log(error.stack)
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
