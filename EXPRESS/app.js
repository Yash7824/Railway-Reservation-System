const express = require('express');
const app = express();
const path = require('path');

const port = 80;

// For serving static File
app.use('/static', express.static('static'))

// Set the template engine as pug 
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// our pug demo endpoint 
app.get("/demo", (req, res) =>{
    res.status(200).render('demo', { title: 'Hey', message: 'Hello there!' })
});

app.listen(port, ()=>{
    console.log(`The application is listening at ${port} port` );
});