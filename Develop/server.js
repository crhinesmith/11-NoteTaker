const { urlencoded } = require('express');
const express = require('express');
let notes = require('./db/db.json')
const fs = require('fs')

const PORT = process.env.PORT || 3001;
const path = require('path');
const { notStrictEqual } = require('assert');

const app = express();

app.use(express.json())

app.use(urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  return res.json(notes)
  // // Let the client know that their request was received
  // res.json(`${req.method} request received`);

  // // Show the user agent information in the terminal
  // console.info(req.rawHeaders);

  // // Log our request to the terminal
  // // console.info(`${req.method} request received`);
});

// POST request
app.post('/api/notes', (req, res) => {
  // const noteID = mathFloorRandom
  let newNote = {title: req.body.title, text: req.body.text}  //id: noteID}
  let notesDb = notes
  notesDb.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(notesDb))
  res.json(newNote)
  

  // // Let the client know that their POST request was received
  // res.json(`${req.method} request received`);

  // // Show the user agent information in the terminal
  // console.info(req.rawHeaders);

  // // Log our request to the terminal
  // console.info(`${req.method} request received`);
});
// app.delete('/api/notes/:id', (req, res) => {
//   noteID = req.params.id
// })

//HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))  
})
//order matters here, * wildcard will catch any URL, therefore it needs to go last so anything besides 'notes' in this case will not just default to the app.get with the wildcard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))  
})
// GET request

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
