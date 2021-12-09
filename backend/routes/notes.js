const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');

//ROUTE 1: Fetch all notes : GET "api/notes/fetchallnotes".  login Req.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error ' });
  }
});

//ROUTE 1: add new notes : POST "api/notes/addnote".  login Req.
router.post(
  '/addnote',
  fetchUser,
  [
    body('title', 'Title must be atleast 3 character').isLength({
      min: 3,
    }),
    body('description', 'Descrption must be atleast 5 character').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error ' });
    }
  }
);

//ROUTE 3: update an existing notes : PUT "api/notes/updatenote".  login Req.
router.put(
  '/updatenote/:id',
  fetchUser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Create a nre note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (title) {
        newNote.description = description;
      }
      if (title) {
        newNote.tag = tag;
      }

      //find a note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Not Found' });
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: Not Allwed  ' });
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        {
          new: true,
        }
      );
      res.json({ note });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error ' });
    }
  }
);

//ROUTE 4: delete an existing notes : DELETE "api/notes/deletenote".  login Req.
router.delete(
  '/deletenote/:id',
  fetchUser,

  async (req, res) => {
    try {
      //find a note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Not Found' });
      }

      // allow deletion only if ouser owns notee
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized: Not Allwed  ' });
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: 'The note has been deleted', note: note });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error ' });
    }
  }
);

module.exports = router;
