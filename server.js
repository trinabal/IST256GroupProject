const express = require('express');
const app = express();
const http = require('http');
const hostfName = '127.0.0.1';
const port = 3000;
const fs = require('fs');
var cors = require('cors');
app.use(cors());
let data = null;

let resArray = [];
let resList = {};

//Create a reservation
app.post('/res/createRes/:fName/:lName/:email/:address/:number', (req, res) => {
  let fName = req.params.fName;
  let lName = req.params.lName;
  let email = req.params.email;
  let address = req.params.address;
  let number = req.params.number;

  let resOb = {};
  resOb.fName = fName;
  resOb.lName = lName;
  resOb.email = email;
  resOb.address = address;
  resOb.number = number;

  let resFile = JSON.parse(fs.readFileSync('res.json'));
  resFile.push(resOb);
  fs.writeFileSync('res.json', JSON.stringify(resFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(resFile);
});

//Get a list of reservations
app.get('/res/getAll', (req, res) => {
  let resFile = JSON.parse(fs.readFileSync('res.json'));
  res.send(resFile);
});

//Update
app.put('/res/updateRes/:fName/:lName/:email/:address/:number', (req, res) => {
  let fName = req.params.fName;
  let lName = req.params.lName;
  let email = req.params.email;
  let address = req.params.address;
  let number = req.params.number;

  let resOb = {};
  resOb.fName = fName;
  resOb.lName = lName;
  resOb.email = email;
  resOb.address = address;
  resOb.number = number;
  let resFile = JSON.parse(fs.readFileSync('res.json'));
  for(let i=0;i<resFile.length;i++){
    console.log(resFile[i].fName);
    if(resFile[i].fName === fName)
    {
      resFile.splice(i, 1, resOb);
    }
  }
  fs.writeFileSync('res.json', JSON.stringify(resFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(resFile);
});

//Delete
app.delete('/res/deleteRes/:fName', (req, res) => {
  let fName1 = req.params.fName;
  let resFile = JSON.parse(fs.readFileSync('res.json'));
  for(let i=0;i<resFile.length;i++){
    if(resFile[i].fName === fName1)
    {
      resFile.splice(i,1);
    }
  }
  fs.writeFileSync('res.json', JSON.stringify(resFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })
  res.send(resFile);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
