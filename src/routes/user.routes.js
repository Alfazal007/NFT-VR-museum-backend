import { Router } from "express";
import { register } from "../controllers/usercontroller/register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { login } from "../controllers/usercontroller/login.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { updateUser } from "../controllers/usercontroller/updateUser.controller.js";
import { logoutUser } from "../controllers/usercontroller/logout.controller.js";
import { changeAvatar } from "../controllers/usercontroller/avatarChange.controller.js";
import { changePassword } from "../controllers/usercontroller/changePassword.controller.js";
import { deleteUser } from "../controllers/usercontroller/deleteUser.controller.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);


// secure route
router.route("/update-user").put(isLoggedIn, updateUser);
router.route("/logout").post(isLoggedIn, logoutUser);
router.route("/update-avatar").put(isLoggedIn, upload.single("avatar"), changeAvatar);
router.route("/update-password").put(isLoggedIn, changePassword);
router.route("/delete-user").delete(isLoggedIn, deleteUser);

export default router;
