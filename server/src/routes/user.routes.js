import { Router } from "express";
import { registerUser, logInUser, logOutUser, currentUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

//register
router.route("/register").post(registerUser)

//login
router.route("/login").post(logInUser)

//logout
router.route("/logout").post(verifyJWT, logOutUser)

//curentUser
router.route("/user").get(verifyJWT,currentUser);

export default router;