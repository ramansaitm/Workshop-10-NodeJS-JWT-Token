//express used to create a aserver 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodeCron=require('node-cron')
const fs=require('fs')
const dotenv = require('dotenv');
dotenv.config()


const midWare = (req, res, next) => {
    console.log("applied");
    next();
}
//connecting a mongo database here with local server ;


const morgan = require('morgan');
app.use(morgan('dev'));
app.use(midWare);

//to read the incoming request;
app.use(bodyParser.json());

//use router
const router = require('./routes/index');
app.use('/', router)


const connectFieled = {
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGO_URI, connectFieled).then(() => {
    console.log("mongo connected")
})



mongoose.connection.on('error', err => {
    console.log("db connection error ,$(errror message")
})
//node-cron and file inserting
// const fileName="raman.txt"
// fs.writeFile(fileName,"line 1/n")check

nodeCron.schedule(' * * * * *', () => {
   
    Write();
  });

  function Write()
  {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    const data = "Data inserted - " + dateTime + "\n";

    fs.appendFile("rk.txt", data, () => {
        console.log("Data is inserted into the file after one minute!");
    })
  }
//created a serever 8000;



const port = 8000;


app.listen(port, () => {
    console.log("we hve connected and created server");
});
