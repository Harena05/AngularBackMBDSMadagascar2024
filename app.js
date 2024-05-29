var express = require('express');
var app = express();
var db = require('./db');
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let matiere = require('./controller/MatiereController');
var cors = require('cors');

global.__root   = __dirname + '/'; 
// global.__basedir = __dirname;

// var secret = process.env.SECRET || "supersecret";

app.use(cors());

var corsOptions = {
  origin: 'https://angularbackmbdsmadagascar2024.onrender.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // les routes
const prefix = '/api';

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// http://serveur..../assignments
app.route(prefix + '/assignments')
.post(assignment.postAssignment)
.put(assignment.updateAssignment)
.get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
.get(assignment.getAssignment)
.delete(assignment.deleteAssignment);

app.route(prefix + '/matieres')
.post(matiere.postMatiere)
.put(matiere.updateMatiere)
.get(matiere.getMatieres);

app.route(prefix + '/matieres/:id')
.get(matiere.getMatiere)
.delete(matiere.deleteMatiere);

var UserController = require(__root + 'controller/UserController');
app.use('/api/users', UserController);

var AuthController = require(__root + 'controller/AuthController');
app.use('/api/auth', AuthController);

var FilController = require(__root + 'controller/FileController');
app.use('/api/file', FilController)

module.exports = app;