require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/route');

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));