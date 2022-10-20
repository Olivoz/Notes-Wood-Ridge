require("dotenv").config();

const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
  process.env.AIRTABLE_BASE
);

/*
var contacts = [];

function getUsers() {
  return new Promise((resolve, reject) => {
    base("UserData")
      .select({
        view: "Grid view",
      })
      .firstPage((err, records) => {
        if (err) {
          reject(err);
          return;
        }
        records.forEach((record) => {
          const user = {
            email: record.get("email"),
            name: record.get("name"),
            password: record.get("password"),
            notes: record.get("notes"),
          };
          contacts.push(user);
        });
        resolve(contacts);
      });
  });
}
*/

function getNote(id) {
  return new Promise((resolve, reject) => {
    base("Notes")
      .find(id)
      .then((record) => {
        const note = {
          id: id,
          owner: record.get("owner"),
          title: record.get("title"),
          content: record.get("content"),
        };
        resolve(note);
      })
      .catch((err) => reject(err));
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    base("UserData")
      .find(id)
      .then((record) => {
        const user = {
          id: id,
          email: record.get("email"),
          name: record.get("name"),
          password: record.get("password"),
          notes: record.get("notes"),
        };
        resolve(user);
      })
      .catch((err) => reject(err));
  });
}

function createUser(user) {
  return base("UserData").create([
    {
      fields: {
        email: user.email,
        name: user.displayName,
        password: user.password,
        notes: JSON.stringify([]),
      },
    },
  ]);
}

function createNote(user, note) {
  return new Promise((resolve, reject) => {
    base("Notes")
      .create([
        {
          fields: {
            owner: user.id,
            title: note.title,
            content: note.content,
          },
        },
      ])
      .then((noteId) => {
        user.notes.push(noteId);
        base("UserData")
          .update([
            {
              id: user.id,
              fields: {
                notes: JSON.stringify(user.notes),
              },
            },
          ])
          .then(() => resolve(noteId))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function updateUser(id, change) {
  return base("UserData").update([
    {
      id: id,
      fields: change,
    },
  ]);
}

function updateNote(id, change) {
  return base("Notes").update([
    {
      id: id,
      fields: change,
    },
  ]);
}

function deleteUser(user) {
  return new Promise((resolve, reject) => {
    getUser(user.id)
      .then((user) => {
        user.notes.forEach(deleteNote); // Use a deleteNotes to prevent rate limit?
      })
      .then(() => {
        base("UserData")
          .destroy(user.id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function deleteNote(note) {
  deleteNotes([note]);
}

function deleteNotes(notes) {
  // The Airtable API has a max amount of 10 records per request. This splits the array in to usable chunks.
  const chunkSize = 10;
  for (let i = 0; i < notes.length; i += chunkSize) {
    const chunk = notes.slice(i, i + chunkSize);
    base("Notes").destroy(chunk.map((note) => note.id));
  }
}

export {
  getUser,
  getNote,
  createUser,
  createNote,
  updateUser,
  updateNote,
  createUser,
  createNote,
  deleteUser,
  deleteNote,
  deleteNotes,
};
