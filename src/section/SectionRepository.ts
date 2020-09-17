import { ISection } from './Section'
import { db } from '../db/jsonDB'


export interface ISectionRepository {
    insertOne(section: ISection): Promise<ISection>
    findAll(productId: Pick<ISection, "productId">): Promise<ISection[]>
    findOne(id: Pick<ISection, "id">): Promise<ISection>
    updateOne(section: Partial<ISection>): Promise<ISection>
    deleteOne(id: Pick<ISection, "id">): Promise<Boolean>
}

export class SectionRepository implements ISectionRepository {
    private collectionName = 'sections'

    public async insertOne(section: ISection): Promise<ISection> {

        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            const created = await collection
                .push({
                    productId: section.productId,
                    text: section.text,
                    id: section.id,
                    created: section.created,
                    updated: section.updated
                })
                .write()
            return created
        } catch (error) {
            return error
        }
    }

    public async findAll(productId: Pick<ISection, "productId">): Promise<ISection[]> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }
            const descriptions = await collection.filter(productId).write()
            return descriptions
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<ISection, "id">): Promise<ISection> {
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

    public async updateOne(section: Partial<ISection>): Promise<ISection> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (section && !section.id) {
                throw new Error('Description id is not found')
            }

            const { created, id, ...updatedSection } = section

            const updated = await collection
                .find({ id: section.id })
                .assign({ ...updatedSection })
                .write()
            return updated
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<ISection, "id">): Promise<Boolean> {
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