import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { body, validationResult } from "express-validator";
import { register, login } from "./routes/auth-routes.js";
import {
  createTodo,
  getTodo,
  deleteTodo,
  completed,
  important
} from "./routes/todo-routes.js";

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://diyormuralimjanovvv:admin@cluster0.w2clukp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err))

// Register requests
app.post(
  "/api/auth/register",
  [
    body("email", "Некорректный Email").isEmail(),
    body("password", "Пароль должен быть Минимум 5 символов").isLength({
      min: 5,
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

app.post("/api/auth/login", login);

// Todo requests
app.post("/api/todo/add", createTodo);
app.get("/api/todo", getTodo);
app.delete("/api/todo/delete/:id", deleteTodo);
app.patch("/api/todo/completed/:id", completed);
app.patch("/api/todo/important/:id", important);

// Error handling middleware
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send("Что-то пошло не так!");
});

const PORT = 5557;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
