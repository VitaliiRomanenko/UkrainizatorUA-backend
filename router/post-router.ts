import {Router} from "express";
import categoryRouter from "./post-router/category-router";
import languageRouter from "./post-router/language-router";


const router: Router = Router()

router.use('/categories', categoryRouter)
router.use('/languages', languageRouter)

export default router