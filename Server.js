const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
var fs = require('fs');
var nodemailer = require('nodemailer');

const { body,validationResult } = require('express-validator');
const { getMaxListeners } = require('process');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sql7824',
  database: "world"

});

const app =express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
// app.get('/', (req, res) => res.send('Hello World!'))


app.get('/SignUp', (req,res) => {

  const { name,date,email,password } = req.body;
  var sql = "INSERT INTO  SignUp (User_name,DOB,Email,Password) VALUES ?";
  const values1 = [
    [ name,date,email,password ]
  ];
  
  con.query(sql,[values1],function(err,res) {
    if(err) {
      throw err;
    } 

    console.log('Last insert ID',res.insertId);
  });
  data= fs.readFile(__dirname+'/Welcome.html',   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
})



// BOOK

app.post('/book', (req,res) => {

  const { username, password } = req.body;
  var sql = "INSERT INTO  login (User_name,Password) VALUES ?";
  const values1 = [
    [username,password]
  ];
  
  con.query(sql,[values1],function(err,res) {
    if(err) {
      throw err;
    } 

    console.log('Last insert ID',res.insertId);
  });
   data= fs.readFile(__dirname+'/Railway.html',   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
})

 
// PAYMENT

app.post('/payment', function(req , res) {

  const { cardname,cardnumber,expmonth,cvv } = req.body;
  var sql = "INSERT INTO Pay (Name_Card,card_num,Exp_month,CVV) VALUES ?";
  const values = [
    [cardname,cardnumber,expmonth,cvv]
  ];

  con.query(sql,[values],function(err,res) {
    if(err) {
      throw err;
    } 

    console.log('Last insert ID',res.insertId);
    


  })

  // MAIL SEND

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'srisenthur123@gmail.com',
      pass: 'pgatimdesukuumwi'
    }
  });
  
  var mailOptions = {
    from: 'srisenthur123@gmail.com',
    to: 'yashraj7824@gmail.com',
    subject: 'Your Tickets',
    text: ' Thank you for booking from our website, Your seat has been reserved. '
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // REDIRECT TO SUCCESS PAGE

  data= fs.readFile(__dirname+'/Success.html',   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
})


  


// TICKETS

app.post('/tickets', (req,res) => {

    const { firstname , lastname , age , address, adhaar, seatno, from, to, gender,accno,date } = req.body;
    var sql1 = "INSERT INTO  U1 (First_Name,Last_Name,Age,Gender,Address,Adhaar) VALUES ?";
    const values1 = [
      [firstname, lastname, age,gender,address,adhaar]
    ];

    var sql2 = "INSERT INTO  U2 (From1,To1,No_of_passengers,Account_No,Date1) VALUES ?";
    const values2 = [
      [from, to, seatno,accno,date]
    ];

    con.query(sql1,[values1],function(err,res) {
      if(err) {
        throw err;
      } 

      console.log('Last insert ID',res.insertId);
    })
    
    con.query(sql2,[values2],function(err,res) {
      if(err) {
        throw err;
      } 

      console.log('Last insert ID',res.insertId);
    })

    // REDIRECT TO PAYMENT PAGE

    data= fs.readFile(__dirname+'/Payment.html',   function (err, data) {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    });

    
   

})
app.listen(80,() => console.log('Example app listening to port 80'))