import {Router} from "express";
import {body} from "express-validator";
import authMiddleware from "../../middlewares/auth-middleware";
import languageController from "../../controllers/language-controller";


const router: Router = Router()

router.post('/create',
    body('name').isLength({min: 2, max: 32}), authMiddleware,
    languageController.createLanguage)
router.get('/', languageController.getAllLanguages)

export default router