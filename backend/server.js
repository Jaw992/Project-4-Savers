//* import
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const pool = require("./config/db"); //* Postgres Connection - import from database url from config folder
const app = express();
const port = process.env.PORT || 3000;

//* Import routers
const usersRouter = require("./controllers/UsersController");
const accountsRouter = require("./controllers/AccountsController");
const transactionsRouter = require("./controllers/TransactionController");

//* middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("../frontend/dist"));

//* Routes
app.get("/api", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()"); // Sample query
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error connecting to the database");
  }
});

app.use("/api/users", usersRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Postgresql has started on ${port}`);
});