const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: "Oops, something happened"
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  posts.getById(id)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "Unable to find post"
      })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: "Oops something happened"
    })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
