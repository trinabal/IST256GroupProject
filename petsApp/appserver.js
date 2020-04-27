var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, 'public'), {extensions: 'html'}));

module.exports = app;

const dbConfig = require('./config/database.config.js');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var func = require('./routes/application.routes.js');
func(app);

app.get('/', (req, res) => {
    res.json({"message": "Welcome to VacayPets."});
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
