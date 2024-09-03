import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "APPLICATION",
           
            
        });
        console.log("Successfully connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err.message || err);
        throw err;  // Re-throw the error to be caught by the caller
    }
};
