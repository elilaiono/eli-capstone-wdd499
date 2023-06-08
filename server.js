const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const dotenv = require('dotenv')

dotenv.config();

app.use(express.json())

app.listen(port, () => console.log(`App is listening on port: ${port}`));