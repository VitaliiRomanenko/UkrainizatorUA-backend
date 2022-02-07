import {Router} from "express";
import categoryRouter from "./post-routers/category-router";
import languageRouter from "./post-routers/language-router";
import postRouter from "./post-routers/post-router";
import memberRouter from "./post-routers/member-router";


const router: Router = Router()

router.use('/categories', categoryRouter)
router.use('/languages', languageRouter)
router.use('/post', postRouter)
router.use('/members', memberRouter)

export default router