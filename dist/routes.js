"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const router = express_1.default.Router();
const mockTodos = [
    { id: '1', title: "Todo 1", completed: false },
    { id: '2', title: "Todo 2", completed: true },
    { id: '3', title: "Todo 3", completed: false },
];
// GET /todos - devuelve todos los todos
router.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield database_1.todoModel.find();
        res.status(200).json(todos);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ error: "Error getting the todo", message: errorMessage });
    }
}));
// POST /todos - crea un nuevo todo
router.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new database_1.todoModel(req.body);
        const result = yield todo.save();
        res.status(201).json(result);
        console.log("Nuevo Todo Creado ok: ", req.body);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ error: "Error creating the todo", message: errorMessage });
    }
}));
// PUT /todos/completed/:id - actualiza un todo como completado
router.put("/todos/completed/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('editing todo');
        const { id } = req.params;
        const todo = yield database_1.todoModel.findById(id);
        console.log('editing todo', todo, ' with id: ', id);
        todo.completed = !todo.completed;
        const result = yield todo.save();
        res.status(200).json(result);
        console.log(`Se adtualiza el todo con id: ${req.params.id}, nuevo estado: ${todo.completed}`);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ error: "Error updating the todo", message: errorMessage });
    }
}));
// PUT /todos/edit/:id - actualiza un todo
router.put("/todos/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield database_1.todoModel.findById(id);
        const newTitle = new database_1.todoModel(req.body).title;
        todo.title = newTitle;
        const result = yield todo.save();
        res.status(200).json(result);
        console.log(`Se adtualiza el todo con id: ${req.params.id}, nuevo texto: ${newTitle}`);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(400).json({ error: "Error updating the todo", message: errorMessage });
    }
}));
// DELETE /todos/:id - elimina un todo
router.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield database_1.todoModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully" });
        console.log("DELETE TODO ID: ", req.params.id);
    }
    catch (error) {
        res.status(400).json({ error: "Error deleting the Todo" });
    }
}));
exports.default = router;
