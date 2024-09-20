const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

/* Accounts routes
/ GET
/:accountId GET
/create POST
/delete DELETE
/update-balance UPDATE
*/

//* Get all accounts
router.get("/", async (req, res) => {
    const accounts = await pool.query("SELECT * FROM accounts");
    res.status(200).json(accounts);
});

//* Get one account
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const account = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
        res.status(200).json(account.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;