import express from "express";
import cors from "cors";
import { config } from "./src/config/config.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./src/db/db.js";
import userRouter from "./src/routes/user.routes.js";
import billsRouter from "./src/routes/bills.routes.js";
import statsRouter from "./src/routes/stats.routes.js";
import {Redis} from "ioredis"
import axios from "axios";

dotenv.config();

const redisClient = new Redis();

const app = express();
const corsOptions = {
    origin: config.frontenPort,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json({limit: "20kb"}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/todos", async (req,res) => {
    try {
        const cachedData = await redisClient.get("todos");
        if (cachedData !== null) {
            console.log("Data fetched from cache");
            return res.json(JSON.parse(cachedData));
        } 
        else {
            console.log("not chached data");
            const {data} = await axios("https://jsonplaceholder.typicode.com/todos")
            await redisClient.set("todos", JSON.stringify(data), "EX", 60);
            return res.json(data);
        }
    } catch (error) {
        
    }
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bills", billsRouter);
app.use("/api/v1/stats", statsRouter); // Assuming you want to use the same router for stats
connectDb();
export default app;