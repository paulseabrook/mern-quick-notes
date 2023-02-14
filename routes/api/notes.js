// require Express
const express = require('express');
//const { handle404 } = require('../lib/custom-errors');

// require the Model we just created
const Note = require('../../models/note');
// const { requireToken } = require('../config/auth');

// Creating a router for us to make paths on
const router = express.Router();

// CREATE
// POST /discs
router.post('/notes', (req, res, next) => {
  const note = req.body.note;
  //note.user = req.user._id;
  Note.create(req.body.note)
    .then((note) => {
      res.status(201).json({ note: note });
    })
    .catch(next);
});

// INDEX
// GET /notes

router.get('/notes', (req, res, next) => {
  Note.find()
    .then((notes) => {
      return notes.map((note) => note);
    })
    .then((notes) => res.status(200).json({ notes: notes }))
    .catch(next);
});

// exporting the router to use elsewhere
module.exports = router;
