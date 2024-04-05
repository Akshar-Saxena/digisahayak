import jwt from "jsonwebtoken";
import { applicationModel } from "../models/application.model.js";
import { v4 } from "uuid";

function applicationController(req, res) {
    const data = req.body;
    console.log(req.cookies);
    const token = jwt.decode(req.cookies.token, { complete: true });
    console.log(token);
    const phno = token.payload.phno;
    const completeData = {
        applicationID: v4(),
        ...data,
        phno: phno,
    };
    const newApplication = new applicationModel(completeData);
    newApplication
        .save()
        .then(() => {
            res.status(201).json({
                message: "Application saved successfully",
            });
        })
        .catch((e) => {
            res.status(500).json({
                message: "Application error",
            });
        });
}

export { applicationController };
