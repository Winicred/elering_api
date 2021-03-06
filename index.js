const express = require("express");
const cors = require("cors");
const ee_current = require('./routes/ee_current_routes');
const day_ahead_price = require('./routes/day_ahead_routes');
const latest = require('./routes/latest_routes');

const app = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render('index.hbs')
    app.use('/js', express.static(__dirname + '/js'));
})

app.use('/api/EE/current', ee_current)
app.use('/api/day-ahead', day_ahead_price)
app.use('/api/latest', latest)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
