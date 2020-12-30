const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");


//authorizeentication

router.post("/admin-register", validInfo, async (req, res) => {
  const {
    user_email,
    user_name,
    user_password,
    phone_number,
    flat_no,
    is_active,
    flat_status,
    fitness,
    swimming_pool,
  } = req.body;

  console.log("register *", req.body);

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);
    console.log("email", user_email);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password,phone_number,flat_no,is_active,flat_status,fitness,swimming_pool) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        user_name,
        user_email,
        bcryptPassword,
        phone_number,
        flat_no,
        is_active,
        flat_status,
        fitness,
        swimming_pool,
      ]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/register", validInfo, async (req, res) => {
  const {
    user_email,
    user_name,
    user_password,
    phone_number,
    flat_no,
    is_active,
    flat_status,
    fitness,
    swimming_pool,
  } = req.body;

  console.log("register *", req.body);

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);
    console.log("email", user_email);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password,phone_number,flat_no,is_active,flat_status,fitness,swimming_pool) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        user_name,
        user_email,
        bcryptPassword,
        phone_number,
        flat_no,
        is_active,
        flat_status,
        fitness,
        swimming_pool,
      ]
    );

   

    return res.json({ newUser});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      user_email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
 
    return res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/admin-login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
