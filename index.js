// Imports
const express = require('express');
const cors = require('cors');
const dbConection = require('./db/conection');// Database conection
const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;

dbConection(); //Execute conection

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log('server running on port ', port));