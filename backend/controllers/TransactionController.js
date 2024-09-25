const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

//* Verify Token
router.use(verifyToken);

//* Get all transactions
router.get("/history/:user_id", async (req, res) => {
  const user_id = req.user.id;

  try {
      const transactions = await pool.query(`
        SELECT 
            t.id, 
            t.transaction_type, 
            t.amount, 
            t.purpose, 
            t.created_at, 
            a1.account_number AS account_number,
            a2.account_number AS receiver_account_number
        FROM transactions t
        LEFT JOIN accounts a1 ON t.account_id = a1.id
        LEFT JOIN accounts a2 ON t.receiver_account = a2.id
        LEFT JOIN users u ON a1.user_id = u.id
        WHERE u.id = $1
        AND a1.status = 'open' 
        AND (a2.status = 'open' OR a2.status IS NULL)  
        ORDER BY t.created_at DESC`
    , [user_id]);

      // Check if there are no transactions
      if (transactions.rows.length === 0) {
        return res.status(404).json({ message: 'No transactions found.' });
      }
      res.status(200).json(transactions.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

//* Get specific transaction
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{ 
        const transaction = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);

        // Check if the transaction was found
        if (transaction.rows.length === 0) {
          return res.status(404).json({ message: 'Transaction not found.' });
        }
        res.status(200).json(transaction.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

//* Create new transactions and update balance
router.post("/newtransaction", async (req, res) => {
  const { transaction_type, amount, account_number, purpose } = req.body; 

try {
  // Start transaction
  await pool.query('BEGIN');

  // Add new transaction
  const newTransactionQuery = `
    INSERT INTO transactions (transaction_type, amount, account_id, purpose)
    VALUES ($1, $2, (SELECT id FROM accounts WHERE account_number = $3), $4) RETURNING *`; 
  const transactionResult = await pool.query(newTransactionQuery, [transaction_type, amount, account_number, purpose]);
  const newTransaction = transactionResult.rows[0];

  // Fetch the current balance of the account using account_number
  const accountResult = await pool.query('SELECT balance FROM accounts WHERE account_number = $1', [account_number]);
  if (accountResult.rows.length === 0) {
    await pool.query('ROLLBACK');
    return res.status(404).json({ error: 'Account not found' });
  }

  let newBalance;
  const currentBalance = accountResult.rows[0].balance;

  // Update the balance based on transaction type
  if (transaction_type === 'deposit') {
    newBalance = currentBalance + amount;
  } else if (transaction_type === 'withdrawal') {
    if (currentBalance < amount) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient funds' });
    }
    newBalance = currentBalance - amount;
  } else {
    await pool.query('ROLLBACK');
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  // Update the account balance using account_number
  await pool.query('UPDATE accounts SET balance = $1 WHERE account_number = $2', [newBalance, account_number]);

  // Commit the transaction
  await pool.query('COMMIT');

  res.status(201).json(newTransaction);
} catch (error) {
  await pool.query('ROLLBACK');
  console.error(error);
  res.status(500).json({ error: 'Transaction failed' });
}
});

//* Create new transactions and update balance - transfers
router.post("/transfer", async (req, res) => {
  const { transaction_type, amount, purpose, sender_account_number, receiver_account_number } = req.body;

  try {
      // Start transaction
      await pool.query('BEGIN');

      // Ensure sender and receiver account numbers are not the same
      if (sender_account_number === receiver_account_number) {
          await pool.query('ROLLBACK');
          return res.status(400).json({ error: 'Sender and receiver accounts cannot be the same' });
      }

      // Fetch the current balance of the sender (using sender_account_number)
      const senderResult = await pool.query('SELECT balance FROM accounts WHERE account_number = $1', [sender_account_number]);
      if (senderResult.rows.length === 0) {
          await pool.query('ROLLBACK');
          return res.status(404).json({ error: 'Sender account not found' });
      }
      const senderBalance = senderResult.rows[0].balance;

      // Check if sender has sufficient balance for the transfer
      if (senderBalance < amount) {
          await pool.query('ROLLBACK');
          return res.status(400).json({ error: 'Insufficient funds in sender account' });
      }

      // Fetch the current balance of the receiver (using receiver_account_number)
      const receiverResult = await pool.query('SELECT balance FROM accounts WHERE account_number = $1', [receiver_account_number]);
      if (receiverResult.rows.length === 0) {
          await pool.query('ROLLBACK');
          return res.status(404).json({ error: 'Receiver account not found' });
      }
      const receiverBalance = receiverResult.rows[0].balance;

      // Update the sender's balance (deduct amount)
      const updatedSenderBalance = senderBalance - amount;
      await pool.query('UPDATE accounts SET balance = $1 WHERE account_number = $2', [updatedSenderBalance, sender_account_number]);

      // Update the receiver's balance (add amount)
      const updatedReceiverBalance = receiverBalance + amount;
      await pool.query('UPDATE accounts SET balance = $1 WHERE account_number = $2', [updatedReceiverBalance, receiver_account_number]);

      // Insert new transaction into the transactions table
      const newTransactionQuery = `
        INSERT INTO transactions (transaction_type, amount, purpose, account_id, receiver_account)
        VALUES ($1, $2, $3, 
        (SELECT id FROM accounts WHERE account_number = $4), 
        (SELECT id FROM accounts WHERE account_number = $5)) RETURNING *`;
      const transactionResult = await pool.query(newTransactionQuery, [transaction_type, amount, purpose, sender_account_number, receiver_account_number]);
      const newTransaction = transactionResult.rows[0];

      // Commit the transaction
      await pool.query('COMMIT');

      res.status(201).json(newTransaction);
  } catch (error) {
      await pool.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ error: 'Transfer transaction failed' });
  }
});

//* Get total_transaction summary (client should get all summary still from close account)
router.get("/summary/:user_id", async (req, res) => {
  const user_id = req.user.id;
  try{ 
      const summary = await pool.query('SELECT * FROM total_transaction WHERE user_id = $1', [user_id]);

      // Check if the summary exists
      if (summary.rows.length === 0) {
          return res.status(404).json({ message: "No transaction summary found for this user." });
      }

      res.status(200).json(summary.rows);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error'});
  }
});

module.exports = router;