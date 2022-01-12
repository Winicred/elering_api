const express = require("express");
const cors = require("cors");
const ee_current = require('./routes/ee_current_routes');

const app = express();

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render('index.hbs')
    app.use('/js', express.static(__dirname + '/js'));
})

app.use('/api/EE/current', ee_current)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
