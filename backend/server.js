//* import
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("hoot:server");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

//* middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("../frontend/dist"));

//* Postgres Connection
// const connectionString =
//   "postgres_url";

//   const Pool = require("pg").Pool;
//   const pool = new Pool({
//     connectionString,
//   });

//* Routes
app.get("/api", async (req, res) => {
    res.json({ msg: "test"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});