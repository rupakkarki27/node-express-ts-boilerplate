import express from "express";
import { signupController, loginController } from "../../controllers";

const router = express.Router();

// route for sign up
router.post("/auth/signup", signupController);

// route for login
router.post("/auth/signin", loginController);

export default router;
