import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";
import LanguageModel, {ILanguage} from "../models/language-model";
import LanguageDto from "../dtos/language-dto";


class CategoryService {

    async createLanguage(name: string, author: UserDto): Promise<LanguageDto> {
        const candidate: ILanguage | null = await LanguageModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`Language: ${name} is already exist`)
        }
        const language: ILanguage = await LanguageModel.create({name, author: author.id})
        return new LanguageDto(language)
    }
    async getAllLanguage(): Promise<ILanguage[]> {
        return LanguageModel.find()
    }

}

export default new CategoryService()