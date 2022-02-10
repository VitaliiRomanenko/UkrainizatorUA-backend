import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";
import {IGetUserAuthInfoRequest} from "../middlewares/auth-middleware";
import CategoryService from "../services/category-service";
import CategoryDto from "../dtos/category-dto";

class CategoryController {
    async createCategory(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }


            const {name} = req.body
            const newCategory: CategoryDto = await CategoryService.createCategory(name, req.user!)
            return res.json(newCategory)
        } catch (e) {
            next(e)
        }
    }
    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories: CategoryDto[] = await CategoryService.getAllCategory()
            res.json(categories)
        } catch (e) {
            next(e)
        }
    }
}

export default new CategoryController()