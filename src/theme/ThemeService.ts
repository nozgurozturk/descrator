import { v4 as uuid } from 'uuid'
import { ColorStyles } from '../styles/ColorStyles';
import { FontStyle } from '../styles/FontStyles';
import { ListStyle } from '../styles/ListStyles';
import { SpaceStyle } from '../styles/SpaceStyles';
import { IStyle, ITheme, Style, Theme } from "./Theme";
import { IThemeRepository } from "./ThemeRepository";

export interface IThemeService {
    insertOne(theme: Partial<ITheme>): Promise<ITheme>
    findOne(id: Pick<ITheme, "id">): Promise<ITheme>
    findAll(): Promise<ITheme[]>
    updateOne(description: Partial<ITheme>): Promise<ITheme>
    deleteOne(id: Pick<ITheme, "id">): Promise<Boolean>
}

export class ThemeService implements IThemeService {
    repository: IThemeRepository
    constructor(repository: IThemeRepository) {
        this.repository = repository
    }

    public async insertOne(theme: Partial<ITheme>): Promise<ITheme> {
        try {

            const description: IStyle = new Style({
                color: new ColorStyles({...theme.description?.color}),
                font: new FontStyle({ ...theme.description?.font }),
                spacing: new SpaceStyle({...theme.description?.spacing}),
                list: new ListStyle({...theme.description?.list})
            })

            const productTitle: IStyle = new Style({
                color: new ColorStyles({...theme.productTitle?.color}),
                font: new FontStyle({...theme.productTitle?.font}),
                spacing: new SpaceStyle({...theme.productTitle?.spacing})                
            })

            const section: IStyle = new Style({
                color: new ColorStyles({...theme.section?.color}),
                font: new FontStyle({...theme.section?.font}),
                spacing: new SpaceStyle({...theme.section?.spacing}),
              
            })

            const createdTheme: ITheme = new Theme({
                id: uuid(),
                name: theme.name!,
                created: new Date(),
                updated: null,
                description: description,
                productTitle: productTitle,
                section: section
            })
            const result = await this.repository.insertOne(createdTheme)
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll(): Promise<ITheme[]> {
        try {
            const result = await this.repository.findAll()
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
            const result = await this.repository.findOne(id)
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
            theme.updated = new Date()
            const result = await this.repository.updateOne(theme)
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
            const result = await this.repository.deleteOne(id)
            return result
        } catch (error) {
            return error
        }
    }
}