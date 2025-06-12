const express = require('express');
const dotenv = require('dotenv')
const router = require('./api/v1/routes/routes')
const errorHandler = require('./api/v1/middleware/errorHandler')
const db = require('./config/db')
const app = express();
dotenv.config({path:'./config.env'})
const PORT = 4000

app.use(express.json());

app.use('/api/v1',router)
app.use(errorHandler)

db.connect().then(() => {
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
});