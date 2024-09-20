const express = require("express");
const router = express.Router();

/* Accounts routes
/ GET
/:accountId GET
/create POST
/delete DELETE
/update-balance UPDATE
*/

//* Get all accounts
router.get("/", async (req, res) => {
    const accounts = await Pool.query("SELECT * FROM accounts");
    res.status(200).json(accounts);
});

module.exports = router;