const express = require('express')
const bodyParser = require('body-parser');
const connectDb = require('./db')
const cors = require('cors');
var signinRouter = require("./routes/signin");
var homeRouter = require("./routes/home");
var noteRouter = require('./routes/notes');
const app = express()
const port = 4000
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/account",signinRouter);
app.use("/home",homeRouter);
app.use("/api",noteRouter);

app.use(bodyParser.json());

connectDb();

let notes = [];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.json(newNote);
  });  



app.listen(port, () => {
  console.log(` App listening on port ${port}`)
})