import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
    {
        address: {
            type: String,
        },
        applicationID: {
            type: String,
            unique: true,
        },
        serviceRequired: {
            type: String,
        },
        phno: {
            type: String,
        },
        isApplied: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const applicationModel = mongoose.model(
    "applications",
    applicationSchema
);
