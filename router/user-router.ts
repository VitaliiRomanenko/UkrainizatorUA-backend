import userController from "../controllers/user-controller";
import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../middlewares/auth-middleware";

const router: Router = Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/all-users', authMiddleware, userController.getUsers)
router.get('/:user', userController.getUser)

export default router