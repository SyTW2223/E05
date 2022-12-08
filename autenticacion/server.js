/*
-> cotiene cors para permitir conexion entre maquinas
-> contiene el codigo para establecer conexion con mongodb con mongoose
*/



const express = require("express"); // construte api rest
const cors = require("cors");       // da middleware para habiltar cors
const app = express();
const db = require("./models");
const dbConfig = require("./config/db.config");
const Role = db.role;
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


// para permitir acceso a otras maquinas, indica el origen del frontend
var corsOptions = {
    origin: "http://10.6.131.130:8080"
};


    //---------- app express que analiza solicitud y cors ------------//
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


    //----------------------------------------------------------------//


// GET simple para prueba
app.get("/", (req, res) => {
  res.json({ message: "Hola, esto es el get de server.js linea 26." });
});

// set port, listen for requests, puerto del backend
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, '172.16.126.55', () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Server is listening at http://${host}:${port}.`);
});

// crea roles usuario y admin en la bbdd
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
            name: "user"
            }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        });
        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
                console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
        });
        }
    });
}

// conexion con mongoose
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB. ");
    console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
    initial();
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});
