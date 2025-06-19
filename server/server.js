const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const router = require('./api/v1/routes/routes')
const errorHandler = require('./api/v1/middleware/errorHandler')
const db = require('./config/db')
const app = express();
dotenv.config()
const PORT = 3000
app.use(cors())

app.use(express.json());

app.use('/api/v1',router)
app.use(errorHandler)

db.connect().then(() => {
    app.listen(PORT);
    console.log(`Server running on http://localhost:${PORT}`);
});