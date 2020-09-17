import { v4 as uuid } from 'uuid'
import { ISection, Section } from "./Section";
import { ISectionRepository } from "./SectionRepository";

export interface ISectionService {
    insertOne({ text, productId }: Pick<ISection, "text" | "productId">): Promise<ISection>
    findOne(id: Pick<ISection, "id">): Promise<ISection>
    findAll(productId: Pick<ISection, "productId">): Promise<ISection[]>
    updateOne(description: Partial<ISection>): Promise<ISection>
    deleteOne(id: Pick<ISection, "id">): Promise<Boolean>
}

export class SectionService implements ISectionService {
    repository: ISectionRepository
    constructor(repository: ISectionRepository) {
        this.repository = repository
    }

    public async insertOne({ text, order, productId }: Pick<ISection, "text" | "order" | "productId">): Promise<ISection> {
        if (!text) {
            throw new Error('Text is required')
        }
        if (!productId) {
            throw new Error('productId is required')
        }
        try {
            const section: ISection = new Section({
                id: uuid(),
                order: order,
                productId: productId,
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

    public async findAll(productId: Pick<ISection, "productId">): Promise<ISection[]> {
        if (!productId) {
            throw new Error("productId is required")
        }
        try {
            const result = await this.repository.findAll(productId)
            return result
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<ISection, "id">): Promise<ISection> {
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

    public async updateOne(section: Partial<ISection>): Promise<ISection> {
        if (!section.id) {
            throw new Error('Id is required')
        }
        try {
            section.updated = new Date()
            const result = await this.repository.updateOne(section)
            return result
        } catch (error) {
            return error
        }
    }

    public async deleteOne(id: Pick<ISection, "id">): Promise<Boolean> {
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