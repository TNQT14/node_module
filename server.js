import express from "express";
import configViewEngine from "./configs/viewEngine.js";
import inintWebRoute from './router/web.js';
import inintUsersRoute from './router/users.js';
import dotenv from 'dotenv';
dotenv.config();
import connect from './database/database.js';
import checkToken from "./authentication/auth.js";
import bodyParser from 'body-parser';

const app = express()
app.use(checkToken)
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

configViewEngine(app);
inintWebRoute(app);
inintUsersRoute(app);

app.listen(port, async () => {
    await connect()
    console.log(`Example app listening on port ${port}`)
})