const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const port = 80;

app.use('static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.status(200).render('index1.pug');
});




app.post('/', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let address = req.body.address;
    let output = `The user name is ${name} whose age is ${age}, gender: ${gender} and lives in ${address}`;

    fs.writeFileSync('output.txt', output);
    
    const params = {
        'message': 'Your form has been submitted successfully'
    };
    res.status(200).render('index1.pug', params);
});

app.listen(port, () => {
    console.log(`The application is listening at ${port} port`);
});