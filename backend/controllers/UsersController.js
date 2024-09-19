const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");

/* Users routes
/signup POST
/login POST
/ GET
/:userId GET
/update-particulars UPDATE
*/

const SALT_LENGTH = 12;

const createJWT = (newUser) => {
    const payload = { username: newUser.rows.username, id: newUser.rows.id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "100y" };
    return jwt.sign(payload, secret, options);
}

//* User signup
router.post("/signup", async (req, res) => {
    const { username, password, email, contact, name, role } = req.body;
    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
        const newUser = await pool.query(
            'INSERT INTO users (username, hashedPassword, email, contact, name, role) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, hashedPassword, email, contact, name, role]
        );
        const token = createJWT(newUser);
        res.status(200).json(newUser.rows, token);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


//* Get all client users
router.get("/", verifyToken, async (req, res) => {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
});

module.exports = router;