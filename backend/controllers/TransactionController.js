const express = require("express");
const router = express.Router();

/* Transactions routes
/history GET all transactions
/:transactionId GET
/newtransaction POST
/update-balance UPDATE
*/

//* Get all transactions
router.get("/", async (req, res) => {
    const transactions = await Pool.query("SELECT * FROM transactions");
    res.status(200).json(transactions);
});

module.exports = router;