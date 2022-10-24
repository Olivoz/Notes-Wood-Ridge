require("dotenv").config();

const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
  process.env.AIRTABLE_BASE
);

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // Fromhttps://html.spec.whatwg.org/multipage/input.html

function userFromRecord(record) {
  return {
    id: record.id,
    email: record.get("email"),
    name: record.get("name"),
    password: record.get("password"),
    notes: JSON.parse(record.get("notes")),
    trash: JSON.parse(record.get("trash")),
  };
}

function getUser(name) {
  return new Promise((resolve, reject) => {
    const isEmail = emailRegex.test(name);
    let formula = isEmail ? `email="${name}"` : `name="${name}"`;

    base("UserData")
      .select({
        maxRecords: 2,
        filterByFormula: formula,
      })
      .eachPage((records, fetchNextPage) => {
        if (records.length != 1) {
          resolve(null);
          return;
        }

        resolve(userFromRecord(records[0]));
      });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    base("UserData")
      .find(id)
      .then((record) => resolve(userFromRecord(record)))
      .catch(reject);
  });
}

function createUser(username, email, password) {
  return new Promise((resolve, reject) => {
    if (!emailRegex.test(email)) {
      reject("Invalid email!");
      return;
    }

    base("UserData")
      .create([
        {
          fields: {
            email: email,
            name: username,
            password: password,
            notes: JSON.stringify([]),
            trash: JSON.stringify([]),
          },
        },
      ])
      .then((records) => resolve(userFromRecord(records[0])))
      .catch(reject);
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

function deleteUser(user) {
  return new Promise((resolve, reject) => {
    getUser(user.id)
      .then((user) => {
        user.notes.forEach(deleteNote); // Use a deleteNotes to prevent rate limit?
        user.trash.forEach(deleteNote);
      })
      .then(() => {
        base("UserData").destroy(user.id).then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
