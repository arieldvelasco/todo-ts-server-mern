import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

const todoModel = mongoose.model('Todo', todoSchema);

export { todoModel };