const noteController = require("../controllers/note.controller");
const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/notes", (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
  }

  res.send(req.user.notes);
});

router.get("/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!user || !user.notes.contains(noteId)) {
    res.sendStatus(401);
    return;
  }

  noteController
    .getNote(noteId)
    .then((note) => res.send(note))
    .catch(() => res.sendStatus(500));
});

router.post("/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!user || !user.notes.contains(noteId)) {
    res.sendStatus(401);
    return;
  }

  const body = req.body;
  const change = {};
  if (body.title) change.title = body.title;
  if (body.content) change.content = body.content;

  if (Object.keys(change).length === 0) {
    res.sendStatus(400);
    return;
  }

  noteController
    .updateNote(noteId, change)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

router.delete("/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!user || !user.notes.contains(noteId)) {
    res.sendStatus(401);
    return;
  }

  noteController
    .deleteNote(noteId)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

router.delete("/new", (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const body = req.body;

  if (!body.title || !body.content) {
    res.sendStatus(400);
    return;
  }

  const note = {
    owner: user.id,
    title: body.title,
    content: body.content,
  };

  noteController
    .createNote(user, note)
    .then(() => {
      res.sendStatus(200);
      user.notes.push(note);
      userController.updateUser(user.id, {
        notes: user.notes,
      });
    })
    .catch(() => res.sendStatus(500));
});

module.exports = router;
