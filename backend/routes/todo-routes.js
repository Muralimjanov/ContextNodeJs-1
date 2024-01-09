import TodoModel from "../models/Todo.js";

export const createTodo = async (req, res) => {
    try {
        const { text, userId } = req.body;
        const todo = new TodoModel({
            text,
            owner: userId,
            completed: false,
            important: false
        });
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.log(err);
    }
};

export const getTodo = async (req, res) => {
    try {
        const { userId } = req.query;
        const todos = await TodoModel.find({ owner: userId });
        res.json(todos);
    } catch (err) {
        console.log(err);
    } 
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findOneAndDelete({ _id: req.params.id });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json({
            todo,
            message: "Successfully deleted",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete todo" });
    }
};

export const completed = async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.log(err);
    }
};

export const important = async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.important = !todo.important;
        await todo.save();
        res.json(todo);
    } catch (err) {
        console.log(err);
    }
};
