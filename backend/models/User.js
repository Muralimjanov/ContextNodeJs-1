import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        type: Types.ObjectId,
        ref: "Todo"
    }]
}, { timestamps: true })

export default model("User", UserSchema)