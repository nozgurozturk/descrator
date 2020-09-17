import { ITheme } from './Theme'
import { db } from '../db/jsonDB'


export interface IThemeRepository {
    insertOne(section: ITheme): Promise<ITheme>
    findAll(): Promise<ITheme[]>
    findOne(id: Pick<ITheme, "id">): Promise<ITheme>
    updateOne(section: Partial<ITheme>): Promise<ITheme>
    deleteOne(id: Pick<ITheme, "id">): Promise<Boolean>
}

export class ThemeRepository implements IThemeRepository {
    private collectionName = 'themes'

    public async insertOne(theme: ITheme): Promise<ITheme> {

        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            await collection
                .push(theme)
                .write()
            return theme
        } catch (error) {
            return error
        }
    }

    public async findAll(): Promise<ITheme[]> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }
            const descriptions = await collection.concat().write()
            return descriptions
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<ITheme, "id">): Promise<ITheme> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (!id) {
                throw new Error('Description id is not found')
            }

            const description = await collection
                .find(id)
                .write()

            return description
        } catch (error) {
            return error
        }
    }

    public async updateOne(theme: Partial<ITheme>): Promise<ITheme> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (theme && !theme.id) {
                throw new Error('Description id is not found')
            }

            const { created, id, ...updatedTheme } = theme

            const updated = await collection
                .find({ id: theme.id })
                .assign({ ...updatedTheme })
                .write()
            return updated
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<ITheme, "id">): Promise<Boolean> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (!id) {
                throw new Error('Theme id is not found')
            }

            await collection
                .remove(id)
                .write()

            return true
        } catch (error) {
            return error
        }
    }
}