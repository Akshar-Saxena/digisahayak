import express from "express";
import cors from "cors";
import "./db/connection.js";
import {
    loginController,
    signupController,
} from "./controller/user.controller.js";
import cookieParser from "cookie-parser";
import { applicationController } from "./controller/application.controller.js";

const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/users/login", loginController);

app.post("/api/users/signup", signupController);

app.post("/api/application/apply", applicationController);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
