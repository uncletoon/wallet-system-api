const express = require('express');
const healthRouter = express.Router()

healthRouter.get('/', (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime().toFixed(2)
    });
});

module.exports = healthRouter;
