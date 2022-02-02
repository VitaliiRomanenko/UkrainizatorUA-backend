import {Response, NextFunction, Request} from "express";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";
import { IGetUserAuthInfoRequest } from "../middlewares/auth-middleware";
import LanguageService from "../services/language-service";
import LanguageDto from "../dtos/language-dto";
import {ILanguage} from "../models/language-model";

class LanguageController {
    async createLanguage(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }


            const {name} = req.body
            const newLanguage: LanguageDto = await LanguageService.createLanguage(name, req.user!)
            return res.json(newLanguage)
        } catch (e) {
            next(e)
        }
    }
    async getAllLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            const languages: ILanguage[] = await LanguageService.getAllLanguage()
            res.json(languages)
        } catch (e) {
            next(e)
        }
    }
}

export default new LanguageController()