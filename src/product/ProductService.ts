import { v4 as uuid } from 'uuid'
import { IProduct, Product } from "./Product";
import { IProductRepository } from "./ProductRepository";

export interface IProductService {
    insertOne({ text }: Pick<IProduct, "text">): Promise<IProduct>
    findOne(id: Pick<IProduct, "id">): Promise<IProduct>
    findAll(): Promise<IProduct[]>
    updateOne(description: Partial<IProduct>): Promise<IProduct>
    deleteOne(id: Pick<IProduct, "id">): Promise<Boolean>
}

export class ProductService implements IProductService {
    repository: IProductRepository
    constructor(repository: IProductRepository) {
        this.repository = repository
    }

    public async insertOne({ text, themeId }: Pick<IProduct, "text" | "themeId">): Promise<IProduct> {
        if (!text) {
            throw new Error('Text is required')
        }
        try {
            const section: IProduct = new Product({
                id: uuid(),
                isFavorite: false,
                themeId: themeId,
                text: text,
                created: new Date(),
                updated: null
            })
            const result = await this.repository.insertOne(section)
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll(): Promise<IProduct[]> {

        try {
            const result = await this.repository.findAll()
            return result
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<IProduct, "id">): Promise<IProduct> {
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

    public async updateOne(product: Partial<IProduct>): Promise<IProduct> {
        if (!product.id) {
            throw new Error('Id is required')
        }
        try {
            product.updated = new Date()
            const result = await this.repository.updateOne(product)
            return result
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<IProduct, "id">): Promise<Boolean> {
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