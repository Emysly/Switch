require("dotenv").config({path: ".env"});
//connect to DB
require("./config/DB").connect();
const express = require("express");
const logger = require("morgan");

const router = require("./router");

const app = express();

//middlewares
if (process.env.NODE_ENV === "dev") {
    app.use(logger("dev", {
        skip: function (req, res) {
            return res.statusCode < 400
        }
    }));
}
app.use(express.json());

//Routes middleware
app.use("/", router);

const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

app.listen(port, () => console.log(`App listening on port ${port}...`));