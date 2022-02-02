import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";
import CategoryModel, {ICategory} from "../models/category-model";
import CategoryDto from "../dtos/category-dto";


class CategoryService {

    async createCategory(name: string, author: UserDto): Promise<CategoryDto> {
        const candidate: ICategory | null = await CategoryModel.findOne({name})
        if (candidate) {
            throw ApiError.BadRequest(`Category: ${name} is already exist`)
        }
        const category: ICategory = await CategoryModel.create({name, author: author.id})
        return new CategoryDto(category)
    }
    async getAllCategory(): Promise<ICategory[]> {
        return CategoryModel.find()
    }

}

export default new CategoryService()