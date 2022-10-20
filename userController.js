//Options parametern tar ett objekt av 
//parametern som sedan skickas till select-metoden.
const express = require('express');
const fs = require('fs');
const server = express();

    var Airtable = require('airtable');
    var base = new Airtable({apiKey: AIRTABLE_APIKEY}).base('app3N5SzPeiGsCTKs');
    var Contacts = [];

const bodyparser = require('body-parser');
    server.use(bodyparser.urlencoded({extended: true}))

server.get('/Contacts', (req,res) => {
    base('Contacts').select({
        view: 'Grid view'

}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
        records.forEach(function(record) {
            var contact = {Name: record.get('Gmail'), Number: record.get('display_name'), Password: record.get('Password')}
            Contacts.push(contact)  
    });
    res.send(Contacts)
    console.log(Contacts)
});
});



    

/*exports.getAirtableRecords = (table, options) => {
    let records = [],
        params = {
            view: 'Grid view',
            pagesize: 15
          
        };

    // Promise, föståelse.
        // kan ändra pagesize senare!
             //varför punkter??  /rad 25

    Object.assign(params, options);

    return new Promise ((resolve, reject) => {
        // Cache värdet om results redan kallats tidigare
        if (records.length > 0) {
            resolve(records);
        };

        const processPage = (partialRecords, fetchNextPage) => {
            records = [...records, ...partialRecords];
            fetchNextPage();
        };

        const processRecords = (err) => {
            if (err) {
                reject (err);
                return;
            };
            resolve(records);
        };
        table.select(params).eachPage(processPage, processRecords);
    });
};


exports.getUserByEmail = (req,res,next) => {
    const { username, password } = req.body;
    const options = {
        filterByFormula: `OR(email = '${username}', '${username}')`
    };

    data.getAirtableRecords(table, options)
    .then (users => {
        users.forEach(function(user) {
            //kallar på nästa mellanprogram(middleware), alltså (function)
            // bekräftat lösenord
            next();
        });
    }).catch(err => {
        console.log( Error (err));
    });
}
      
    

    */