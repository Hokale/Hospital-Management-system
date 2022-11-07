const express = require('express');
const bodyParser = require('body-parser');
const patients = [{
    name: 'mayur',
    number: '9309788413',
    dob: '29/11/19992',
    city: 'Latur',
    roomNo: '1'
}]
const availableBeds = 5;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.render("index.ejs", {
        data: patients
    })
})
app.post("/", (req, res) => {
    const name = req.body.name
    const number = req.body.number
    const dob = req.body.dob
    const city = req.body.city
    if (patients.length < availableBeds) {
        const roomNo = patients.length + 1;

        patients.push({
            name: name,
            number: number,
            dob: dob,
            city: city,
            roomNo: roomNo
        })

        res.render("index", {
            data: patients
        })
    }
    else {
        res.send("No Room Available");
    }
})
app.post('/discharge', (req, res) => {
    var name = req.body.name;
    var j = 0;
    patients.forEach(patient => {
        j = j + 1;
        if (patient.name == name) {
            patients.splice((j - 1), 1)
        }
    })
    res.render("index", {
        data: patients
    })
})
app.listen(8080, (req, res) => {
    console.log("App is running on port 8080");
})