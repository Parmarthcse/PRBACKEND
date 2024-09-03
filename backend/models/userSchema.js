import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        minLength: [3, "Name must contain 3 letters"],
        maxLength: [23, "Name cannot exceed 23 characters"],
    },
    email: String,
    phone: Number,
    password: {
        type: String,
        minLength: [8, "Password must contain atleast 8 characters"],
       
    }
});
export const User = mongoose.model("User ", userSchema);