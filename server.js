const express = require('express');
const register = require('./routes/user/register.route');
const login = require('./routes/user/auth.route');
const users = require('./routes/user/user.routes');
const guests = require('./routes/guests/guest.routes');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;
// connect to database
connectDB();

// allow to access json data from request body
app.use(express.json({ extended: true }));

// user routes
app.use('/', register);
app.use('/', login);
app.use('/', users);
app.use('/', guests);

app.listen(PORT, () => console.log(`Server running on port ${PORT} ...`))

module.exports = app;
