const express = require('express');
const app = express();

const healthRouter = require('./routers/health.routers');
const userRouter = require('./routers/user.routers');


app.get("/", (req, res) => {
    res.send("It's work!!!!")
});


app.use("/health", healthRouter);
app.use("/users", userRouter);


module.exports = app;