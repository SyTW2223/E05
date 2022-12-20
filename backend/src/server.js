const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({
    origin:"http://localhost:8081"
}));

// parse requests of content-type - application/json
// app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const db = require("./models");

// API REST
require("./routes/book.routes")(app);
require("./routes/user.routes")(app);
require("./routes/list.routes")(app);
require("./routes/serie.routes")(app);
require("./routes/film.routes")(app);


// PRUEBAS TDD API REST
//require("./test/book.spec")

// simple route
app.get("/", (_, res) => {
    console.log("peticion recibida")
    res.send("Hola, esto es el backend." );
});

// set port, listen for requests, puerto del backend
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || '172.16.126.55';
var server = app.listen(PORT, URL, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server is listening at http://${host}:${port}.`);
});


// conexion con mongoose
const DB_URL = process.env.DB_URL || `mongodb://${db.HOST}:${db.PORT}/${db.DB}`;
const DB_USER = process.env.DB_USER || db.USER;
const DB_PASSWORD = process.env.DB_PASSWORD|| db.PASSWORD;
db.mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB. ");
    console.log(`mongodb://${db.HOST}:${db.PORT}/${db.DB}`);
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

module.exports = app;