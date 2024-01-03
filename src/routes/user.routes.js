import { Router } from "express";
import { register } from "../controllers/usercontroller/register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { login } from "../controllers/usercontroller/login.controller.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

export default router;