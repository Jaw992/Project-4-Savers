//* import
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const { Pool } = require("pg");
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

//* Postgres Connection
// const connectionString =
//   "process.env.POSTGRES_URL";

  // const pool = new Pool({
  //   connectionString: process.env.POSTGRES_URL,
  // });

//* Routes
app.get("/api", async (req, res) => {
    res.json({ msg: "test"});
});

app.use("/api/users", usersRouter);
app.use("/api/accounts", accountsRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Postgresql has started on ${port}`);
});