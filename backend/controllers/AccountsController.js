const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

//* Verify Token
router.use(verifyToken);

//* Get all accounts
router.get("/", async (req, res) => {
    const accounts = await pool.query("SELECT * FROM accounts");
    res.status(200).json(accounts.rows);
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
        // Check if the account number already exists
        const existingAccount = await pool.query('SELECT * FROM accounts WHERE account_number = $1',
            [account_number]);
  
        // If the account already exists, return an error
        if (existingAccount.rows.length > 0) {
            return res.status(400).json({ error: 'Account number already exists' });
        }

        const newAccount = await pool.query(
          'INSERT INTO accounts (balance, account_number, account_type, user_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [balance, account_number, account_type, user_id, manager_id]
        );
        res.status(201).json({ msg: "Account created successfully", account: newAccount.rows[0] });
      } catch (error) {
        res.status(500).send({error: 'Internal server error'});
      }
});

//* Delete an account
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteAccount = await pool.query('DELETE FROM accounts WHERE id = $1 RETURNING *', [id]);
        if (deleteAccount.rows.length === 0) {
          return res.status(404).json({ msg: 'Account not found' });
        }
        res.status(200).json({ msg: 'Account deleted', account: deleteAccount.rows[0] });
      } catch (error) {
        console.error(error.message);
        res.status(500).send({error: 'Internal server error'});
      }
});

//* Update balance of an account
router.put("/update-balance/:id", async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;
    try {
        const updateBalance = await pool.query(
          'UPDATE accounts SET balance = $1 WHERE id = $2 RETURNING *',
          [balance, id]
        );
        if (updateBalance.rows.length === 0) {
          return res.status(404).json({ msg: 'Account not found' });
        }
        res.status(200).json({ msg: "Update Successful", balance: updateBalance.rows[0] });
      } catch (error) {
        console.error(error.message);
        res.status(500).send({error: 'Internal server error'});
      }
});

module.exports = router;