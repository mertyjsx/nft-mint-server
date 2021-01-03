const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all todos and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const users = await pool.query("SELECT * FROM users");

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo

router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/delete-user/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );
    console.log(deleteTodo);
    if (deleteTodo.rows.length === 0) {
      return res.json("You cant delete");
    }

    res.json({ status: true });
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update-user/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      created_at,
      user_name,
      user_email,
      phone_number,
      flat_status,
      flat_no,
      swimming_pool,
      fitness,
      is_active,
      moved_at,
      user_id,
    } = req.body;
    console.log(user_name)
    const updateTodo = await pool.query(
      "UPDATE users SET  created_at = $1,user_name = $2,user_email = $3,phone_number = $4,flat_status = $5,flat_no = $6,swimming_pool = $7, fitness = $8,is_active = $9,moved_at = $10 WHERE user_id = $11  RETURNING *",
      [
        created_at,
        user_name,
        user_email,
        phone_number,
        flat_status,
        flat_no,
        swimming_pool,
        fitness,
        is_active,
        moved_at,
        id,
      ]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
