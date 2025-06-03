import express from "express"
import { getUser, login, logout, register } from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/getUser', isAuthenticated, getUser);

export default router;