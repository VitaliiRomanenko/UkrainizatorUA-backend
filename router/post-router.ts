import {Router} from "express";
import categoryRouter from "./post-router/category-router";
import languageRouter from "./post-router/language-router";
import postRouter from "./post-router/post-router";
import memberRouter from "./post-router/member-router";


const router: Router = Router()

router.use('/categories', categoryRouter)
router.use('/languages', languageRouter)
router.use('/posts', postRouter)
router.use('/members', memberRouter)

export default router