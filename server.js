const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./config/db.config");
const db = require("./models");

var corsOptions = {
  origin: "http://10.6.131.130:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola, esta es la linea 19 de server.js." });
});

// set port, listen for requests, puerto del backend
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, '172.16.126.55', () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server is listening at http://${host}:${port}.`);
});


// conexion con mongoose
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB. ");
    console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});
