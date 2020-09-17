import { IProduct } from "./Product";
import { ProductRepository } from "./ProductRepository";
import { ProductService, IProductService } from "./ProductService";

export interface IProductController {
    insertOne({ text }: Pick<IProduct, "text">): Promise<IProduct>
    findOne(id: Pick<IProduct, "id">): Promise<IProduct>
    findAll():Promise<IProduct[]>
    updateOne(product: Partial<IProduct>): Promise<IProduct>
    deleteOne(id: Pick<IProduct, "id">): Promise<Boolean>
}

class ProductController implements IProductController {
    service: IProductService
    constructor(service: IProductService) {
        this.service = service
    }
    public async insertOne({ text }: Pick<IProduct, "text">): Promise<IProduct> {
        try {
            const result = await this.service.insertOne({text})
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

    public async findOne(id: Pick<IProduct, "id">): Promise<IProduct> {
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

    public async updateOne(product: Partial<IProduct>): Promise<IProduct> {
        if (!product.id) {
        throw new Error('Id is required')
    }
        try {
            const result = await this.service.updateOne(product)
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
            const result = await this.service.deleteOne(id)
            return result
        } catch (error) {
            return error
        }
    }
}

export const productController = new ProductController(new ProductService( new ProductRepository()))