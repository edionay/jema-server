const express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose')
const usersController = require('./controllers/users');
const daysController = require('./controllers/days');
const User = require('./models/users');

const port = process.env.PORT || 8080;

const url = `mongodb+srv://vstillo:l69nHArDzsh4s2OQ@cluster0-w2p5a.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose running')
});

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.listen(port)

server.get('/', async(req, res) => {
    // users.forEach(async user => {
    //     user.passcode = cpfToPasscode(user.cpf)
    //     await User.create(user);
    // });
    // console.log("AEW!")
})

server.get('/days', async(req, res) => {
    try {
        const days = await daysController.getAll()
        res.status(200).send(days)
    } catch (error) {
        console.log(error)
    }
})

server.post('/login', async(req, res) => {
    const user = req.body

    try {
        const foundUser = await usersController.login(user.email, user.passcode)
        if (foundUser) res.status(200).send(foundUser)
        else res.status(401).send()
    } catch (error) {
        res.status(500).send()
    }
})

server.post('/schedule', async(req, res) => {
    const user = req.body.user
    const schedule = req.body.selectedTime

    try {
        const foundUser = await usersController.getOne(user.email, user.passcode.toString())
        if (!foundUser) res.status(401).send("Credenciais inválidas")
        else if (!foundUser.upToVote) res.status(402).send(foundUser)
        else {
            const day = await daysController.getOne(schedule.dayId)
            const time = day.hours.find(day => { return day._id == schedule._id })
            if (!time.appointment1) {
                time.appointment1 = foundUser._id
                foundUser.upToVote = false
                foundUser.schedule.day = day.label
                foundUser.schedule.date = schedule.date
                foundUser.schedule.time = time.label
                await day.save()
                foundUser.save()
                res.status(201).send(foundUser)
            } else if (!time.appointment2) {
                time.appointment2 = foundUser._id
                foundUser.upToVote = false
                foundUser.schedule.day = day.label
                foundUser.schedule.date = schedule.date
                foundUser.schedule.time = time.label
                await day.save()
                await foundUser.save()
                res.status(201).send(foundUser)
            } else res.status(400).send("Horários indisponíveis para este dia")
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send()
    }
})
console.log('Port: ' + port)