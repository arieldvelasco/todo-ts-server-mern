"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
var corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, DELETE"
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
dotenv_1.default.config({ path: __dirname + '/.env.local' });
const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const mongodbURI = `mongodb+srv://${mongodbUser}:${mongodbPass}@todo-app.4j4ck.mongodb.net/`;
mongoose_1.default
    .connect(mongodbURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("Failed to Connect to MongoDB:", err));
app.use('/api', routes_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
});
