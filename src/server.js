const express = require('express');
const dotenv = require('dotenv')
const router = require('./routes/root')
const db = require('./db/initialize')

const app = express();
dotenv.config()
const PORT = process.env.PORT

app.use(express.json());

app.use('/', router.rootRoutes)

db.connect().then(() => {
    app.listen(process.env.PORT);
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});