// npm install --save nodemon
// node_modules/.bin/nodemon -w .

const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const creds = require('./Models/credentials.js')
const codeSnippet = require('./Models/schema.js')
const session = require('express-session');
// const credentials = require('./Models/credentials.js')

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/codeSnippetSchemaLibrary');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//
// const username_password = [{
//     user: 'jimminy',
//     password: 'cricket'
//   },
//   {
//     user: 'alfred',
//     password: 'hitchcock'
//   },
//   {
//     user: 'marlon',
//     password: 'brando'
//   },
//   {
//     user: 'tupac',
//     password: 'shakur'
//   }
// ]

//LOGIN//
app.use(function(req, res, next) {
  if (req.url == '/Login') {
    next('route');
  } else if (!req.session.username) {
    res.render('index')
  } else {
    console.log("next(route)");
    next('route');
  }
});

app.get('/', function(req, res) {
  console.log("rendering /");
  res.render('index')
})

app.post('/Login', function(req, res) {
  console.log("username is " + req.body.username);
  console.log("password is " + req.body.password);
  for (let i = 0; i < creds.length; i++) {
    if (req.body.username === creds[i].user && req.body.password === creds[i].password) {
      req.session.username = true;
    }
    }
  if (req.session.username === true) {
    console.log("index rendered");
    console.log("blah");
    res.redirect('/');
  } else {
    console.log("rendering login");
    res.render('Login', {
      error: true});
}
})

//Delete//

app.post('/delete/:id', function(req, res) {
  codeSnippet.deleteOne({
      _id: new ObjectId(req.params.id)
    })
    .then(function(results) {
      console.log(snippet successfully deleted);
      res.redirect('index');
    });
});

//LOGIN END//

//--this block of code allows me to create a new document instance into my database, referencing my scheme--//
// const exampleGameEntry =
// new videoGameData ({name : 'Shadow of the Colossus', platform :['pc', 'ps4']});
// console.log(exampleGameEntry);

//--these are two different ways to save new info to databse from atom- one that will catch errors and log, one that doesn't--//
// exampleGameEntry.save()
//or//
// exampleGameEntry.save(function (err)){
//   if (err) return console.log(err);
// }

// --this was a test hard coded array--//

//--THIS ALLOWS ME TO POST GAME DATA TO PAGE--//

// app.get('/', function(req, res) {
//   console.log('we are able to display information from database and collection');
//   videoGameData.find().then(function (doesntmatter){
//   res.render('index', {object : doesntmatter})
// })
// });


//--THIS POST ALLOWS me to render root with data that was hardcoded for initial testing--//

// app.post('/games', function(req, res){
//   let newUserInput = req.body.userInput;
//   const videoGameEntry = new videoGameData ({name : newUserInput});
// videoGameEntry.save()
// .then(function (results){
//   console.log(results);
//   return videoGameData.find()
// })
// .then(function (againdoesnotmatter){
//   res.render('index',{object : againdoesnotmatter})
// })
// });


//--THIS BLOCK ALLOWS ME TO TAKE INFORMATION SUBMITTED ON THE WEBPAGE WEBFORM AND AUTOMATICALLY PUSH IT TO THE DATABASE--//
// const recipe = new Recipe({name: name, source: "Grandma"});
// const videoGameEntry = new videoGameData ({name : req.body.userInput});
//
//
// console.log(videoGameEntry);
// videoGameEntry.save()
// recipe.save()
//   .then(function () {
//     console.log('saved ' + name);
//     return Recipe.findOne({name: "Pancakes" + suffix})
//   }).then(function(results) {
//     console.log('\nfindOne returned\n' + results);
//     return Recipe.find({cookTime: {$gt: 15, $lt: 60}})
//   }).then(function (results) {
//     console.log('\n\nfind returned ' + results.length + ' results');
//   }).catch(function (error) {
//     console.log('error ' + JSON.stringify(error));
//   })


//--THIS CODE BLOCK ALLOWS ME TO UPDATE OLD ENTIRES BASED ON NEW USER ENTRIES FROM THE WEBFORM--//
// const videoGameEntry = new videoGameData ({name : req.body.userInput});
// console.log(videoGameEntry);
// videoGameEntry.save()
//   .then(function(results) {
//     return videoGameEntry.findOne({name: req.body.userInput})
  // .then(function (results) {
    // console.log('\nfindOne returned\n' + results);
    // return Recipe.updateOne({source: "Grandma"},
    // {$push: {steps: "Call Grandma and tell her how it was."}})
  // }).then(function (results) {
  //   console.log('\nupdateOne returned\n' + JSON.stringify(results));
  //   return videoGameEntry.findOne({name: req.body.userInput})
  // }).then(function (results) {
  //   console.log('\nfindOne returned\n' + results);
  //   return videoGameEntry.updateMany({source: "Grandma"},
  //   {$push: {steps: "Call Grandma and tell her how much the dog enjoyed it."}})
  // }).then(function (results) {
  //   console.log('\nupdateMany returned\n' + JSON.stringify(results));
  //   return Recipe.find({source: "Grandma"});
  // }).then(function (results) {
  //   console.log('\nfind source:Grandma returned\n');
  //   results.forEach(function(rec) {
  //     console.log(rec);
  //   })
  // }).catch(function (error) {
  //   console.log('error ' + JSON.stringify(error));
  // })


//--THIS BLOCK OF CODE ALLOWS ME TO DELETE ENTIRES--//
// app.post('/delete/:name', function (req, res){
//   let gameToDelete = req.params.name;
//   videoGameData.deleteOne({ name: gameToDelete })
//   .then(function (){
//     res.redirect('/')
//   })
// });

app.listen(3000, function() {
  console.log('Successfully started express application!')
})

// process.on('SIGINT', function() {
//   console.log("\nshutting down");
//   mongoose.connection.close(function () {
//     console.log('Mongoose default connection disconnected on app termination');
//     process.exit(0);
//   });
// });
