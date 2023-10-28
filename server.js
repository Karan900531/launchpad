const fileupload = require('express-fileupload');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const users = require('./routes/api/users');
const cors = require('cors');
// require('./config/passport')(passport);

const app = express();
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(fileupload())
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')))


// const db = require('./config/keys').mongoURI;

// mongoose.connect(db, { useNewUrlParser: true })
//     .then(() =>
//         console.log('MongoDB successfully connected.',db)
//     ).catch(err => console.log(err));

app.use(passport.initialize());

// app.use('/cms', users);

app.use(express.static(path.join(__dirname, '')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/',()=>{
    console.log("check all")
})

const port = 8000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
