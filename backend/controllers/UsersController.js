const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const verifyManager = require("../middleware/verifyManager");
const pool = require("../config/db");


const SALT_LENGTH = 12;

const createJWT = (newUser) => {
    const payload = { id: newUser.rows[0].id, username: newUser.rows[0].username, name: newUser.rows[0].name, role: newUser.rows[0].role };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "100y" };
    return jwt.sign(payload, secret, options);
}

//* User signup
router.post("/signup", async (req, res) => {
    const { username, password, email, contact, name, role } = req.body;

    if (!username || !password || !email || !contact || !name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE username = $1 AND role = $2', [username, role]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
        const newUser = await pool.query(
            'INSERT INTO users (username, hashedPassword, email, contact, name, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, hashedPassword, email, contact, name, role]
        );
        const token = createJWT(newUser);
        res.status(201).json({ msg: "User created successfully", user: newUser.rows[0], token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* User login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid Useranme & Password"});
        }

        const user = userResult.rows[0];
        const match = await bcrypt.compare(password, user.hashedpassword);
        if (match) {
            const token = createJWT(userResult);
            return res.status(200).json({ msg: "Login Successful", token: token});
        }
        res.status(401).json({ error: "Invalid Username & Password"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get all client users
router.get("/client", verifyToken, async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized access. Invalid or expired token." });
        }

        const users = await pool.query("SELECT * FROM users WHERE role = $1", ['client']);

        if (users.rows.length === 0) {
            return res.status(404).json({ message: "No clients found." });
        }

        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get a single client users
router.get("/client/:id", verifyToken, async (req, res) => {
    // const { id } = req.params;
    const id = req.user.id
    try {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        
        // Check if the client was found
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Client not found." });
        }
        res.status(200).json(user.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get all relationship managers users
router.get("/manager", verifyToken, verifyManager, async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users WHERE role = $1", ['relationship manager']);
        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Get a single relationship manager users according to client assignment of rm during account creation
router.get("/manager/:user_id", verifyToken, async (req, res) => {
    // const { id } = req.params;
    const user_id = req.user.id
    try {
        const user = await pool.query(
            `SELECT u.id, u.username, u.name, u.email, u.contact
            FROM accounts a
            JOIN users u ON a.manager_id = u.id
            WHERE a.user_id = $1;`, [user_id]
        );

        // Check if the relationship manager was found
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "Relationship Manager not found." });
        }
        res.status(200).json(user.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

//* Update particulars of client users
// router.put("/update-particulars/:id", verifyToken, async (req, res) => {
//     const { id } = req.params;
//     const { name, email, contact } = req.body;
//     try {
//         if (!name || !email || !contact) {
//             return res.status(400).json({ message: 'Name, email, and contact are required.' });
//         }

//         const updateUser = await pool.query(
//             'UPDATE users SET name = $1, email = $2, contact = $3 WHERE id = $4 RETURNING *',
//             [name, email, contact, id]);
//         res.status(200).json(updateUser.rows[0]);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

//* Update particulars of client users
router.put("/update-particulars/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;

    // Prepare an array to hold the updates
    const updates = [];
    const values = [];

    // Check for each field and add to the updates array
    if (name) {
        updates.push(`name = $${updates.length + 1}`);
        values.push(name);
    }
    if (email) {
        updates.push(`email = $${updates.length + 1}`);
        values.push(email);
    }
    if (contact) {
        updates.push(`contact = $${updates.length + 1}`);
        values.push(contact);
    }

    // If there are no fields to update, return a 400 error
    if (updates.length === 0) {
        return res.status(400).json({ message: 'Please fill out at least one field to update.' });
    }

    // Add the id to the end of the values array
    values.push(id);

    // Create the final SQL query string
    const query = `
        UPDATE users
        SET ${updates.join(", ")}
        WHERE id = $${values.length}
        RETURNING *
    `;

    try {
        const updateUser = await pool.query(query, values);
        res.status(200).json(updateUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;