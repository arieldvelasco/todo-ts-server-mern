import express from "express";
import { todoModel } from "./database";

const router = express.Router();

const mockTodos = [
    { id: '1', title: "Todo 1", completed: false },
    { id: '2', title: "Todo 2", completed: true },
    { id: '3', title: "Todo 3", completed: false },
];

// GET /todos - devuelve todos los todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: "Error getting the todo", message: errorMessage });
    }
});

// POST /todos - crea un nuevo todo
router.post("/todos", async (req, res) => {
    try {
        const todo = new todoModel(req.body);
        const result = await todo.save();
        res.status(201).json(result);
        console.log("Nuevo Todo Creado ok: ", req.body);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: "Error creating the todo", message: errorMessage });
    }
});

// PUT /todos/completed/:id - actualiza un todo como completado
router.put("/todos/completed/:id", async (req, res) => {
    try {
        console.log('editing todo');
        const { id } = req.params;
        const todo = await todoModel.findById(id);
        console.log('editing todo', todo, ' with id: ', id);
        
        todo!.completed = !todo!.completed;
        const result = await todo!.save();
        res.status(200).json(result);
        console.log(`Se adtualiza el todo con id: ${req.params.id}, nuevo estado: ${todo!.completed}`);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: "Error updating the todo", message: errorMessage });
    }
});

// PUT /todos/edit/:id - actualiza un todo
router.put("/todos/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todoModel.findById(id);
        const newTitle = new todoModel(req.body).title;
        todo!.title = newTitle;
        const result = await todo!.save();
        res.status(200).json(result);
        console.log(`Se adtualiza el todo con id: ${req.params.id}, nuevo texto: ${newTitle}`);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: "Error updating the todo", message: errorMessage });
    }
});

// DELETE /todos/:id - elimina un todo
router.delete("/todos/:id", async (req, res) => {
    try
    {
        const { id } = req.params;
        await todoModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully"});
        console.log("DELETE TODO ID: ", req.params.id);
    } catch (error) {
        res.status(400).json({ error: "Error deleting the Todo"});
    }
});

export default router;