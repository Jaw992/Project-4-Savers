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

//* Create a new account
router.post("/create", async (req, res) => {
    const { balance, account_number, account_type, user_id, manager_id } = req.body;
    try {
        const result = await pool.query(
          'INSERT INTO accounts (balance, account_number, account_type, user_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [balance, account_number, account_type, user_id, manager_id]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).send({error: 'Internal server error'});
      }
});

module.exports = router;