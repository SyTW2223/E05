/**
 * https://www.bezkoder.com/node-js-mongodb-auth-jwt/
 */

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const Role = db.role;
// const dbConfig = './config/db.config.js';
// const path = __dirname + './views/';


var dbConfig = {
    HOST: "127.0.0.1",
    PORT: 27017,
    DB: "SyTW",
    //url: "mongodb+srv://my-story-app:storyapp@cluster0.f1buatx.mongodb.net/SyTW"
};

var corsOptions = {
    origin: "http://10.6.131.130:8080"
};
// app.use(express.static(path));
// crea roles en la bbdd
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

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to storya-app application." });
});

app.get("/login", (req, res) => {
    res.json({ message: "Welcome to login." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
});

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
