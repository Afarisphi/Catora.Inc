const express = require('express');
const bodyParser = require('body-parser');
const registerUserRouter = require('./Authentification/register-user');
const loginUserRouter = require('./Authentification/login-user');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Register routers
app.use(registerUserRouter);
app.use(loginUserRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
