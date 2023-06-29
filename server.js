const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const dotenv = require('dotenv')
const { db } = require('./db/firebase')
const cors = require('cors')

dotenv.config();

app.use(cors());
app.use(express.json())
app.use('/', require('./routes'))

app.listen(port, () => console.log(`App is listening on port: ${port}`));