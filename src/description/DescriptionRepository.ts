import { IDescription } from './Description'
import { db } from '../db/jsonDB'


export interface IDescriptionRepository {
    insertOne(description: IDescription): Promise<IDescription>
    findAll(sectionId: Pick<IDescription, "sectionId">): Promise<IDescription[]>
    findOne(id: Pick<IDescription, "id">): Promise<IDescription>
    updateOne(description: Partial<IDescription>): Promise<IDescription>
    deleteOne(id: Pick<IDescription, "id">): Promise<Boolean>
}

export class DescriptionRepository implements IDescriptionRepository{
    private collectionName = 'descriptions'

    // TODO
    private validate() {

    }
    public async insertOne(description: IDescription): Promise<IDescription> {

        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            const created = await collection
                .push({
                    sectionId: description.sectionId,
                    text: description.text,
                    id: description.id,
                    created: description.created,
                    updated: description.updated
                })
                .write()
            return created
        } catch (error) {
            return error
        }
    }

    public async findAll(sectionId: Pick<IDescription, "sectionId">): Promise<IDescription[]> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }
            const descriptions = await collection.filter(sectionId).write()
            return descriptions
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<IDescription, "id">): Promise<IDescription> {
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

    public async updateOne(description: Partial<IDescription>): Promise<IDescription> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (description && !description.id) {
                throw new Error('Description id is not found')
            }

            const { created, id, ...updatedDescription } = description

            const updated = await collection
                .find({ id: description.id })
                .assign({ ...updatedDescription })
                .write()
            return updated
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<IDescription, "id">): Promise<Boolean> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (!id) {
                throw new Error('Description id is not found')
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