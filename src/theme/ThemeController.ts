import { ITheme } from "./Theme";
import { ThemeRepository } from "./ThemeRepository";
import { ThemeService, IThemeService } from "./ThemeService";

export interface IThemeController {
    insertOne(theme: Partial<ITheme>): Promise<ITheme>
    findOne(id: Pick<ITheme, "id">): Promise<ITheme>
    findAll():Promise<ITheme[]>
    updateOne(description: Partial<ITheme>): Promise<ITheme>
    deleteOne(id: Pick<ITheme, "id">): Promise<Boolean>
}

class ThemeController implements IThemeController {
    service: IThemeService
    constructor(service: IThemeService) {
        this.service = service
    }
    public async insertOne(theme: Partial<ITheme>): Promise<ITheme> {
        try {
            const result = await this.service.insertOne(theme)
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll() {
        try {
            const result = await this.service.findAll()
            return result
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<ITheme, "id">): Promise<ITheme> {
        if (!id) {
            throw new Error('Id is required')
        }
        try {
            const result = await this.service.findOne(id)
            return result
        } catch (error) {
            return error
        }
    }

    public async updateOne(theme: Partial<ITheme>): Promise<ITheme> {
        if (!theme.id) {
            throw new Error('Id is required')
        }
        try {
            const result = await this.service.updateOne(theme)
            return result
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<ITheme, "id">): Promise<Boolean> {
        if (!id) {
            throw new Error('Id is required')
        }
        try {
            const result = await this.service.deleteOne(id)
            return result
        } catch (error) {
            return error
        }
    }
}

export const themeController = new ThemeController(new ThemeService( new ThemeRepository()))