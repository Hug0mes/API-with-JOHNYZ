const express = require('express')
const nedb = require('nedb')
const parser = require('body-parser')
const port = process.env.PORT || 9000

class Employee {
    constructor(name, age, email) {
        this.name = name, this.age = age, this.email = email
    }
}

const database = new nedb('./database/data.db')
database.loadDatabase()

const app = express()

app.use(parser.urlencoded({ extended: true }))
app.use(express.json())

app.get('/v2/workers', (req, res) => {
    database.find({}, (err, result) => {
        res.json(result)
    })
})

app.post('/v2/workers/add', (req, res) => {
    const { name, age, email } = req.body
    let employee = new Employee(name, age, email)
    try {
        database.insert(employee, (err, result) => {
            res.json({ msg: `Employee ${name} added` })
        })
    } catch {
        res.status(500).json({
            msg: "Something went wrong!!!"
        })
    }
})

app.delete('/v2/workers/del/:name', (req, res) => {
    const workerName = req.params.name
    database.remove({ name: workerName }, (err, result) => {
        res.json({ msg: `Employee ${workerName} removed` })
    })
})

app.put('/v2/workers/edit/:name', (req, res) => {
    const workerName = req.params.name
    database.ed
})

app.listen(port, () => {
    console.log(`connected at ${port}`)
})