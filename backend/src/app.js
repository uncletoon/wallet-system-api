const express = require('express');
const app = express();

app.use(express.json());

const healthRouter = require('./routes/health.routes');
const userRouter = require('./routes/user.routes');
const accRoutes = require('./routes/account.routes')


app.get("/", (req, res) => {
    res.send("It's work!!!!")
});


app.use("/health", healthRouter);
app.use("/users", userRouter);
app.use("/accounts", accRoutes);


module.exports = app;