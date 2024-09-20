const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

/* Transactions routes
/history GET all transactions
/:transactionId GET
/newtransaction POST
/update-balance UPDATE
*/

//* Get all transactions
router.get("/", async (req, res) => {
    const transactions = await pool.query("SELECT * FROM transactions");
    res.status(200).json(transactions);
});

module.exports = router;