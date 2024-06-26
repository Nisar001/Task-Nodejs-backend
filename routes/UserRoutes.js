import express from 'express'
import {registerController, loginController, forgetPasswordcontroller, allUserController} from '../controller/UserController.js'
import {isAdmin, requireSignIn} from "../middleware/AuthMiddleware.js"

const router = express.Router();

// Register
router.post('/register', registerController)

// Login
router.post('/login', loginController)

// forget password
router.post('/forgot-password', forgetPasswordcontroller)

router.get('/user-auth', requireSignIn, (req, res) => {
   res.status(200).send({ok: true})
})

router.get('/admin-auth', requireSignIn, isAdmin, allUserController, (req, res) => {
   res.status(200).send({ok: true})
})

export default router;