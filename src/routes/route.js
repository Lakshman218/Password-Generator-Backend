import express from "express";
import { deletePasswordController, getPasswordController, loginController, savePasswordController, signupController } from "../controllers/controller.js";


const router = express.Router();

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/savePassword', savePasswordController)
router.post('/getPassword', getPasswordController)
router.post('/deletePassword', deletePasswordController)

export default router