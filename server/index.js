const express = require('express');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

const PORT = process.env.PORT || 5000

// pour pouvoir communiquer avec le PORT du client lors des requêtes à la bdd avec axios
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use('/api/user', userRoutes)
app.use('/api/event', eventRoutes)

// server
app.listen(PORT, () => {
    console.log(`Listening on port : ${process.env.PORT}`);
})