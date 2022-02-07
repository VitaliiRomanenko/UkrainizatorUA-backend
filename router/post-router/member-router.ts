import {Router} from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import MemberController from "../../controllers/member-controller";


const router: Router = Router()

router.post('/create', authMiddleware, MemberController.createNewMember)
router.post('/leave', authMiddleware, MemberController.leavePost)
router.get('/users-member', MemberController.AllUsersMember)
router.get('/post-members', MemberController.AllPostMembers)


export default router