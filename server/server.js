const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const data = require('./data.json');

app.get('/get', (req, res) => {
    const {limit, page} = req.query;

    return res.send({ cardData: data.slice(Number(limit) * Number(page - 1), Number(limit) * Number(page - 1) + Number(limit)) });
})

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT number ${PORT}`)
});