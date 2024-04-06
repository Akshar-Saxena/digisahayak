import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

async function loginController(req, res) {
    const { phno, pass } = req.body;
    const results = await userModel.find({ phno: phno });
    if (results.length > 0) {
        const token = jwt.sign(
            {
                phno: phno,
            },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
        if (pass == results[0].password) {
            res.status(200)
                .cookie("token", token, {
                    sameSite: "none",
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true,
                    secure: true,
                })
                .json({
                    message: "Login Successful",
                });
        } else {
            res.status(404).json({
                message: "Invalid Credentials",
            });
        }
    } else {
        res.status(404).json({
            message: "User not found",
        });
    }
}

function signupController(req, res) {
    const { phno, pass, fullname, userType } = req.body;
    const newUser = new userModel({
        phno: phno,
        password: pass,
        fullname: fullname,
        userType: userType,
    });
    newUser
        .save()
        .then(() => {
            res.status(201).json({
                message: "User Created Successfully",
            });
        })
        .catch((e) => {
            res.status(500).json({
                message: "User creation failed",
            });
        });
}

export { loginController, signupController };
