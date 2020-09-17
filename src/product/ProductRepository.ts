import { IProduct } from './Product'
import { db } from '../db/jsonDB'


export interface IProductRepository {
    insertOne(section: IProduct): Promise<IProduct>
    findAll(): Promise<IProduct[]>
    findOne(id: Pick<IProduct, "id">): Promise<IProduct>
    updateOne(section: Partial<IProduct>): Promise<IProduct>
    deleteOne(id: Pick<IProduct, "id">): Promise<Boolean>
}

export class ProductRepository implements IProductRepository {
    private collectionName = 'products'

    public async insertOne(product: IProduct): Promise<IProduct> {

        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            await collection
                .push({
                    id: product.id,
                    text: product.text,
                    themeId: product.themeId,
                    isFavorite: product.isFavorite,
                    created: product.created,
                    updated: product.updated
                })
                .write()
            return {
                id: product.id,
                text: product.text,
                themeId: product.themeId,
                isFavorite: product.isFavorite,
                created: product.created,
                updated: product.updated
            }
        } catch (error) {
            return error
        }
    }

    public async findAll(): Promise<IProduct[]> {
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

    public async findOne(id: Pick<IProduct, "id">): Promise<IProduct> {
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

    public async updateOne(product: Partial<IProduct>): Promise<IProduct> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (product && !product.id) {
                throw new Error('Description id is not found')
            }

            const { created, id, ...updatedProduct } = product

            const updated = await collection
                .find({ id: product.id })
                .assign({ ...updatedProduct })
                .write()
            return updated
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<IProduct, "id">): Promise<Boolean> {
        try {
            const collection = (await db).get(this.collectionName)

            if (!collection) {
                throw new Error('Collection is not found in DB')
            }

            if (!id) {
                throw new Error('Product id is not found')
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