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
router.get("/history", async (req, res) => {
    const transactions = await pool.query('SELECT * FROM transactions');
    res.status(200).json(transactions.rows);
});

//* Get specific transaction
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{ 
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
        res.status(200).json(transaction.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

module.exports = router;