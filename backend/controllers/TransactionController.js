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

router.post("/newtransaction", async (req, res) => {
    const { transaction_type, amount, account_id } = req.body;

  try {
    // Start transaction
    await pool.query('BEGIN');

    // Add new transaction
    const newTransactionQuery = `
      INSERT INTO transactions (transaction_type, amount, account_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const transactionResult = await pool.query(newTransactionQuery, [transaction_type, amount, account_id]);
    const newTransaction = transactionResult.rows[0];

    // Fetch the current balance of the account
    const accountResult = await pool.query('SELECT balance FROM accounts WHERE id = $1', [account_id]);
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

    // Update the account balance
    await pool.query('UPDATE accounts SET balance = $1 WHERE id = $2', [newBalance, account_id]);

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(201).json(newTransaction);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Transaction failed' });
  }
})

router.post("/transfer", async (req, res) => {
    const { transaction_type, amount, purpose, account_id, receiver_account } = req.body;

  try {
    // Start transaction
    await pool.query('BEGIN');

    // Ensure account_id and receiver_account are not the same
    if (account_id === receiver_account) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ error: 'Sender and receiver accounts cannot be the same' });
    }

    // Fetch the current balance of the sender (account_id)
    const senderResult = await pool.query('SELECT balance FROM accounts WHERE id = $1', [account_id]);
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

    // Fetch the current balance of the receiver (receiver_account)
    const receiverResult = await pool.query('SELECT balance FROM accounts WHERE id = $1', [receiver_account]);
    if (receiverResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Receiver account not found' });
    }
    const receiverBalance = receiverResult.rows[0].balance;

    // Update the sender's balance (deduct amount)
    const updatedSenderBalance = senderBalance - amount;
    await pool.query('UPDATE accounts SET balance = $1 WHERE id = $2', [updatedSenderBalance, account_id]);

    // Update the receiver's balance (add amount)
    const updatedReceiverBalance = receiverBalance + amount;
    await pool.query('UPDATE accounts SET balance = $1 WHERE id = $2', [updatedReceiverBalance, receiver_account]);

    // Insert new transaction into the transactions table
    const newTransactionQuery = `
      INSERT INTO transactions (transaction_type, amount, purpose, account_id, receiver_account)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const transactionResult = await pool.query(newTransactionQuery, [transaction_type, amount, purpose, account_id, receiver_account]);
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

module.exports = router;