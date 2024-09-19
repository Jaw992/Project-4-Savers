const express = require("express");
const router = express.Router();

//* Get all client users
router.get("/", async (req, res) => {
    const users = await Pool.query("SELECT * FROM users");
    res.status(200).json(users);
});

module.exports = router;