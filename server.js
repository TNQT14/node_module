import express from 'express'
import * as dotenv from 'dotenv'
import {
    usersRouter,
    studentsRouter
} from './router/index.js'
dotenv.config()
const app = express()

const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.send("Response from root router, ahihi")
})

app.use('/users', usersRouter)
app.use('/students', studentsRouter)

app.listen(port, async (req, res) =>
    console.log(`Listen on port: ${port}`)
)