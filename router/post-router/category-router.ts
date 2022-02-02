import categoryController from "../../controllers/category-controller";
import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../../middlewares/auth-middleware";


const router: Router = Router()

router.post('/create',
    body('name').isLength({min: 2, max: 32}), authMiddleware,
    categoryController.createCategory)
router.get('/', categoryController.getAllCategories)

export default router