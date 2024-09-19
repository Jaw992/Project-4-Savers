const express = require("express");
const router = express.Router();

//* Get all transactions
router.get("/", async (req, res) => {
    const transactions = await Pool.query("SELECT * FROM transactions");
    res.status(200).json(transactions);
});

module.exports = router;