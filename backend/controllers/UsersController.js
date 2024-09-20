const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const pool = require("../config/db");


const SALT_LENGTH = 12;

const createJWT = (newUser) => {
    const payload = { username: newUser.username, role: newUser.role };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "100y" };
    return jwt.sign(payload, secret, options);
}

//* User signup
router.post("/signup", async (req, res) => {
    const { username, password, email, contact, name, role } = req.body;
    try {
        // const userExists = await pool.query('SELECT * FROM users WHERE username = $1 AND role $2', [username, role]);
        // if (userExists.rows.length > 0) {
        //     return res.status(400).json({ message: 'Username already exists' });
        // }
        
        const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
        const newUser = await pool.query(
            'INSERT INTO users (username, hashedPassword, email, contact, name, role) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, hashedPassword, email, contact, name, role]
        );
        const token = createJWT(newUser);
        res.status(201).json({ msg: "User created successfully", user: newUser.rows, token: token});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* User login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (!user) {
            return res.status(401).json({ error: "Invalid Useranme & Password"});
        }

        const match = await bcrypt.compare(password, user.rows.hashedPassword);
        if (match) {
            // const token = createJWT(user);
            return res.status(200).json({token});
        }
        res.status(401).json({ error: "Invalid Username & Password"});
    } catch (error) {
        res.status(500).json({ error: error.messsage });
    }
});

//* Get all client users
router.get("/client", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users WHERE role = $1", ['client']);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get a single client users
router.get("/client/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json(user.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get all relationship managers users
router.get("/manager", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users WHERE role = $1", ['relationship manager']);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get a single client users
router.get("/manager/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json(user.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Update particulars of client users
router.put("/update-particulars/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    try {
        if (!name || !email || !contact) {
            return res.status(400).json({ message: 'Name, email, and contact are required.' });
        }

        const updateUser = await pool.query(
            'UPDATE users SET name = $1, email = $2, contact = $3 WHERE id = $4',
            [name, email, contact, id]);
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;