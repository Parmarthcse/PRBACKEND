import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {  // Changed from 'name' to 'title' to match the controller
        type: String,
        required: [true, "Task title is required"],
        minLength: [4, "Title must contain at least 4 characters"],
    },
    description: { 
        type: String,
        default: "",  // Optional, defaulting to an empty string
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",  // Add reference to the 'User' model
        required: true,  // Ensure this field is required
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Automatically set the creation date
    },
});

export const Task = mongoose.model("Task", taskSchema);
