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

//* Get all created accounts with client and relationship manager names from data_warehouse
router.get("/rmtable", async (req, res) => {
  const acclist = await pool.query("SELECT * FROM account_creation");
  res.status(200).json(acclist.rows);
});

//* Get all accounts and total balance for a specific user
router.get("/sum/:user_id", async (req, res) => {
  const user_id = req.user.id; // Assuming you're using authentication middleware to set req.user

  try {
      const accounts = await pool.query("SELECT * FROM accounts WHERE user_id = $1", [user_id]);
      
      // Calculate total balance for the user's accounts
      const totalBalanceQuery = "SELECT SUM(balance) AS total_balance FROM accounts WHERE user_id = $1";
      const totalBalanceResult = await pool.query(totalBalanceQuery, [user_id]);
      const totalBalance = totalBalanceResult.rows[0].total_balance || 0; // Default to 0 if no accounts

      res.status(200).json({ accounts: accounts.rows, total_balance: totalBalance });
  } catch (error) {
      console.error('Error fetching accounts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
  }
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
// router.post("/create", async (req, res) => {
//     const { balance, account_number, account_type, user_id, manager_id } = req.body;
//     try {
//         // Check if the account number already exists
//         const existingAccount = await pool.query('SELECT * FROM accounts WHERE account_number = $1',
//             [account_number]);
  
//         // If the account already exists, return an error
//         if (existingAccount.rows.length > 0) {
//             return res.status(400).json({ error: 'Account number already exists' });
//         }

//         const newAccount = await pool.query(
//           'INSERT INTO accounts (balance, account_number, account_type, user_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//           [balance, account_number, account_type, user_id, manager_id]
//         );
//         res.status(201).json({ msg: "Account created successfully", account: newAccount.rows[0] });
//       } catch (error) {
//         res.status(500).send({error: 'Internal server error'});
//       }
// });

//* Create a new account
router.post("/create/:manager_id", async (req, res) => {
  const { balance, account_number, account_type, name } = req.body;
  try {
      // Check if the account number already exists
      const existingAccount = await pool.query('SELECT * FROM accounts WHERE account_number = $1', [account_number]);

      // If the account already exists, return an error
      if (existingAccount.rows.length > 0) {
          return res.status(400).json({ error: 'Account number already exists' });
      }

      // Get the user_id of the account holder by their name
      const accountHolderQuery = await pool.query('SELECT id FROM users WHERE name = $1', [name]);
      if (accountHolderQuery.rows.length === 0) {
          return res.status(400).json({ error: 'Account holder does not exist' });
      }
      const user_id = accountHolderQuery.rows[0].id;

      // Get the user_id of the relationship manager by their name
      // const managerQuery = await pool.query('SELECT id FROM users WHERE id = $1', [id]);
      // if (managerQuery.rows.length === 0) {
      //     return res.status(400).json({ error: 'Relationship manager does not exist' });
      // }
      // const manager_id = managerQuery.rows[0].id;
      const manager_id = req.user.id;

      // Create the new account using user_id and manager_id
      const newAccount = await pool.query(
        'INSERT INTO accounts (balance, account_number, account_type, user_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [balance, account_number, account_type, user_id, manager_id]
      );

      res.status(201).json({ msg: "Account created successfully", account: newAccount.rows[0] });
  } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: 'Internal server error' });
  }
});

//* Delete an account
router.delete("/delete", async (req, res) => {
    const { account_number } = req.body;
    try {
        const deleteAccount = await pool.query('DELETE FROM accounts WHERE account_number = $1 RETURNING *', [account_number]);
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