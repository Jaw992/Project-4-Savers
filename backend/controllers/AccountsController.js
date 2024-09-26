const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

//* Verify Token
router.use(verifyToken);

//* Get all accounts
router.get("/:user_id", async (req, res) => {
  const user_id = req.user.id;
  const accounts = await pool.query("SELECT * FROM accounts WHERE user_id = $1 AND status = 'open' ORDER BY account_number", [user_id]);
  res.status(200).json(accounts.rows);
});

//* Get all created accounts with client and relationship manager names from data_warehouse
router.get("/rmtable/:manager_id", async (req, res) => {
  const manager_id = req.user.id;
  const acclist = await pool.query("SELECT * FROM account_creation ORDER BY client_name, account_number");
  res.status(200).json(acclist.rows);
});

//* Get all accounts and total balance for a specific user
router.get("/sum/:user_id", async (req, res) => {
  const user_id = req.user.id; //? Follows the client_id who is login by his token

  try {
      const accounts = await pool.query("SELECT * FROM accounts WHERE user_id = $1 AND status = 'open'", [user_id]);
      
      // Calculate total balance for the user's accounts
      const totalBalanceQuery = "SELECT SUM(balance) AS total_balance FROM accounts WHERE user_id = $1 AND status = 'open'";
      const totalBalanceResult = await pool.query(totalBalanceQuery, [user_id]);
      const totalBalance = totalBalanceResult.rows[0].total_balance || 0; 

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

//* Generate random unique number with no sequence (with a large range)
function generateRandomAccountNumber() {
  const randomSection1 = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const randomSection2 = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const randomSection3 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${randomSection1}-${randomSection2}-${randomSection3}`;
}

//* Create a new account
router.post("/create/:manager_id", async (req, res) => {
  const { balance, account_type, name } = req.body;
  try {
      let account_number;
      let unique = false;

      // Keep generating new account numbers until we find a unique one
      while (!unique) {
          account_number = generateRandomAccountNumber();
          const existingAccount = await pool.query('SELECT * FROM accounts WHERE account_number = $1', [account_number]);

          if (existingAccount.rows.length === 0) {
              unique = true;
          }
      }

      // Get the user_id of the account holder by their name
      const accountHolderQuery = await pool.query('SELECT id FROM users WHERE name = $1', [name]);
      if (accountHolderQuery.rows.length === 0) {
          return res.status(400).json({ error: 'Account holder does not exist' });
      }
      const user_id = accountHolderQuery.rows[0].id;

      const manager_id = req.user.id; //? Follows the manager_id who is login by his token
      
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

//* Update account status for closing an account - Simulate delete function
router.put("/update-status", async (req, res) => {
  const { account_number } = req.body;
  
  try {
    // Find the account by account_number
    const accountQuery = await pool.query(
      'SELECT * FROM accounts WHERE account_number = $1',
      [account_number]
    );

    if (accountQuery.rows.length === 0) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    const account = accountQuery.rows[0];

      // Check if the account has a balance
      if (account.balance > 0) {
        // Check if the user has other accounts
        const otherAccountsQuery = await pool.query(
          'SELECT * FROM accounts WHERE user_id = $1 AND account_number != $2 AND status = $3',
          [account.user_id, account_number, 'open']
        );

        if (otherAccountsQuery.rows.length > 0) {
          const nextAccount = otherAccountsQuery.rows[0];

          // Transfer the balance to the next available account
          await pool.query(
            'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
            [account.balance, nextAccount.id]
          );
          
          // Set balance of the closed account to 0
          await pool.query(
            'UPDATE accounts SET balance = 0 WHERE account_number = $1',
            [account_number]
          );
        } else {
          return res.status(400).json({ msg: 'No other open account. Please contact client to withdrawal money' });
        }
      }

      // Update the status of the account to 'closed'
      const updateStatus = await pool.query(
        'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *',
        ['closed', account_number]
      );

      return res.status(200).json({
        msg: 'Account closed successfully, balance transferred',
        account: updateStatus.rows[0]
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//* Delete an account
// router.delete("/delete", async (req, res) => {
//     const { account_number } = req.body;
//     try {
//         const deleteAccount = await pool.query('DELETE FROM accounts WHERE account_number = $1 RETURNING *', [account_number]);
//         if (deleteAccount.rows.length === 0) {
//           return res.status(404).json({ msg: 'Account not found' });
//         }
//         res.status(200).json({ msg: 'Account deleted', account: deleteAccount.rows[0] });
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send({error: 'Internal server error'});
//       }
// });

//* Create a new account
// router.post("/create/:manager_id", async (req, res) => {
//   const { balance, account_number, account_type, name } = req.body;
//   try {
//       // Check if the account number already exists
//       const existingAccount = await pool.query('SELECT * FROM accounts WHERE account_number = $1', [account_number]);

//       // If the account already exists, return an error
//       if (existingAccount.rows.length > 0) {
//           return res.status(400).json({ error: 'Account number already exists' });
//       }

//       // Get the user_id of the account holder by their name
//       const accountHolderQuery = await pool.query('SELECT id FROM users WHERE name = $1', [name]);
//       if (accountHolderQuery.rows.length === 0) {
//           return res.status(400).json({ error: 'Account holder does not exist' });
//       }
//       const user_id = accountHolderQuery.rows[0].id;

//       // Get the user_id of the relationship manager by their name
//       // const managerQuery = await pool.query('SELECT id FROM users WHERE id = $1', [id]);
//       // if (managerQuery.rows.length === 0) {
//       //     return res.status(400).json({ error: 'Relationship manager does not exist' });
//       // }
//       // const manager_id = managerQuery.rows[0].id;
//       const manager_id = req.user.id; //? Follows the manager_id who is login by his token

//       // Create the new account using user_id and manager_id
//       const newAccount = await pool.query(
//         'INSERT INTO accounts (balance, account_number, account_type, user_id, manager_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//         [balance, account_number, account_type, user_id, manager_id]
//       );

//       res.status(201).json({ msg: "Account created successfully", account: newAccount.rows[0] });
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send({ error: 'Internal server error' });
//   }
// });

module.exports = router;