require("dotenv").config();

const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
  process.env.AIRTABLE_BASE
);

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

function getNotes(ids) {
  return new Promise((resolve, reject) => {
    const filter = ids.map((id) => `RECORD_ID()="${id}"`).join(",");

    base("Notes")
      .select({
        maxRecords: ids.length,
        filterByFormula: `OR(${filter})`,
      })
      .eachPage((records, fetchNextPage) => {
        const notes = records.map((record) => {
          return {
            id: record.id,
            owner: record.get("owner"),
            title: record.get("title"),
            content: record.get("content"),
          };
        });
        resolve(notes);
      })
      .catch(reject);
  });
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
      .then((records) => {
        const noteId = records[0].id;
        user.notes.unshift(noteId);
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

function updateNote(id, change) {
  return base("Notes").update([
    {
      id: id,
      fields: change,
    },
  ]);
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

module.exports = {
  getNote,
  getNotes,
  createNote,
  updateNote,
  createNote,
  deleteNote,
  deleteNotes,
};
