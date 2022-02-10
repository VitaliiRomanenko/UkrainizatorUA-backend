import {Router} from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import CommentController from "../../controllers/comment-controller";


const router: Router = Router()

router.post('/create', authMiddleware, CommentController.createNewComment)
router.get('/user-comments', CommentController.AllUserComments)
router.get('/post-comments', CommentController.AllPostComments)


export default router