require("dotenv").config();

const Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_APIKEY }).base(
  process.env.AIRTABLE_BASE
);

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g; // Fromhttps://html.spec.whatwg.org/multipage/input.html

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

function userFromRecord(record) {
  return {
    id: record.id,
    email: record.get("email"),
    name: record.get("name"),
    password: record.get("password"),
    notes: record.get("notes"),
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
      .then((record) => {
        resolve(userFromRecord(record));
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

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  createUser,
  deleteUser,
};
