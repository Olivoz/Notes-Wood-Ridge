const noteController = require("../controllers/note.controller");
const userController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/notes/:start", (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
  }

  const start = req.params.start;
  const notes = user.notes.slice(start, start + 4);

  switch (notes.length) {
    case 0:
      res.send([]);
      break;

    case 1:
      noteController
        .getNote(notes[0])
        .then((note) => res.send([note]))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      break;

    default:
      noteController
        .getNotes(notes)
        .then((notes) => res.send(notes))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      break;
  }
});

router.get("/note/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!user || (!user.notes.includes(noteId) && !user.trash.includes(noteId))) {
    res.sendStatus(401);
    return;
  }

  noteController
    .getNote(noteId)
    .then((note) => res.send(note))
    .catch(() => res.sendStatus(500));
});

router.post("/note/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;
  if (!user || !user.notes.includes(noteId)) {
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

router.delete("/note/:noteId", (req, res) => {
  const user = req.user;
  const noteId = req.params.noteId;

  if (!user || (!user.notes.includes(noteId) && !user.trash.includes(noteId))) {
    res.sendStatus(401);
    return;
  }

  noteController
    .deleteNote(user, noteId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/new", (req, res) => {
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
    .then((note) => {
      res.send(note);
      userController
        .updateUser(user.id, {
          notes: JSON.stringify(user.notes),
        })
        .catch(console.log);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/trash", (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const noteId = req.body.id;

  if (!noteId) {
    res.sendStatus(400);
    return;
  }

  if (!user.notes.includes(noteId)) {
    res.sendStatus(401);
    return;
  }

  noteController
    .trashNote(user, noteId)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get("/trash/:start", (req, res) => {
  const user = req.user;
  if (!user) {
    res.sendStatus(401);
    return;
  }

  const start = req.params.start;
  const notes = user.trash.slice(start, start + 4);

  switch (notes.length) {
    case 0:
      res.send([]);
      break;

    case 1:
      noteController
        .getNote(notes[0])
        .then((note) => res.send([note]))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      break;

    default:
      noteController
        .getNotes(notes)
        .then((notes) => res.send(notes))
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
      break;
  }
});

module.exports = router;
