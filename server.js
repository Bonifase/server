const express = require('express');
const register = require('./routes/register.route');
const login = require('./routes/auth.route');
const users = require('./routes/user.routes');
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

app.listen(PORT, () => console.log(`Server running on port ${PORT} ...`))

module.exports = app;
