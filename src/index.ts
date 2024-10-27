// src/index.ts
import express, { Express, Request, Response } from "express";
import cors from 'cors';
import router from "./routes";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: '*',
  methods: "GET, POST, PUT, DELETE"
}

app.use(cors(corsOptions));
app.use(express.json());

dotenv.config({ path: __dirname+'/.env.local' });

const mongodbUser = process.env.MONGODB_USER;
const mongodbPass = process.env.MONGODB_PASS;
const mongodbURI = `mongodb+srv://${mongodbUser}:${mongodbPass}@todo-app.4j4ck.mongodb.net/`;

mongoose
.connect(mongodbURI)
.then(() => console.log("CONNECTED TO MONGODB!"))
.catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});