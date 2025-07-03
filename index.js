const express = require('express');
const authRouter = require('./routes/authRoute');
const bookRouter = require('./routes/bookRoute');
const app = express();
require("dotenv").config();
app.use(express.json());

//logs all the method and path
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`);
    next();
  });

app.use('/auth' , authRouter);
app.use('/' , bookRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    console.log("hehe")
    res.status(500).json({ message: 'Something went wrong on the server' });
  });
  

const PORT = process.env.PORT || 3001;

app.listen(PORT , console.log(`server is running on http://localhost:${PORT}`));