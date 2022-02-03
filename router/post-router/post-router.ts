import {Router} from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import PostController from "../../controllers/post-controller";


const router: Router = Router()

router.post('/create', authMiddleware, PostController.createPost)
router.get('/', PostController.getAllPosts)

export default router