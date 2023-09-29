// import
const express = require("express");
// instance
const app = express();
// import
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
// make env
require("dotenv").config();
// json use sengen
app.use(express.json());
// static file ... html ect ...
app.use(express.static("./public"));
// port
const PORT = 2000;

// api routes base 
app.use("/api/v1/tasks", taskRoute);
// db connection

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log("start server"));
    } catch (err) {
        console.log(err);
    }
};

start();


