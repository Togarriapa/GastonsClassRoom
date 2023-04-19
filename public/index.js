const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require('dotenv');



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const YOUR_SECRET_KEY = process.env.YOUR_SECRET_KEY;

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server");
});

// Your API routes will go here

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// Registration route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the user into the database
    await db.promise().query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Authentication route
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email exists
      const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const user = rows[0];
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

    // Create and sign a JSON Web Token
    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        YOUR_SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      // Send the token as a response
      res.status(200).json({ token });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });