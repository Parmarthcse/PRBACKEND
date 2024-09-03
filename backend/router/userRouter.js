import express from "express"
import { getUser, login, logout, register } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register)
router.post('/test', (req, res) => {
    console.log(req.body); // Log the incoming data
    res.send('Data received');
});
router.post("/login", login)
//is authenticated work as a middleware 
router.get("/me",isAuthenticated, getUser)
router.get("/logout", isAuthenticated, logout)

export default router;