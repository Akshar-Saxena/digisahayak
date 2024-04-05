import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
        },
        phno: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        userType: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true }
);

export const userModel = mongoose.model("users", userSchema);
