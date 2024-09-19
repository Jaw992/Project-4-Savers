const express = require("express");
const router = express.Router();

//* Get all accounts
router.get("/", async (req, res) => {
    const accounts = await Pool.query("SELECT * FROM accounts");
    res.status(200).json(accounts);
});

module.exports = router;