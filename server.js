import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express

port = process.env.PORT;
app.listen(port ?? 3000, async (req, res) =>
    console.log(`Listen on port: ${port}`)
)