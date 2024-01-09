import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоррекный данные при регистрация",
            });
        }
        const { email, password } = req.body;
        const isUsed = await UserModel.findOne({ email });
        if (isUsed) {
            return res.status(300).json({
                message: "Данный Email уже занят, попробуйте другой",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new UserModel({
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({
            message: "Пользователь создан",
        });
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Такого Email нет в базе",
      });
    }
    const isMatch = await bcrypt.compare(password, user._doc.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Неверный пароль или Email",
      });
    }
    const jwtSecret = "secret123";
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "4h",
    });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.log(err);
  }
};