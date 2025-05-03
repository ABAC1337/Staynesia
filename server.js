const express = require('express');
const dotenv = require('dotenv')
const router = require('./routes/root')
const db = require('./db/initialize')
const routerExpress = express.Router()
const app = express();
dotenv.config()
const PORT = 4000

app.use(express.json());

app.use(router.rootRoutes)


db.connect().then(() => {
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
});