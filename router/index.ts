import {Router} from "express";
import userRouter from "./user-router";
import postRouter from "./post-router";

const router: Router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)

export default router