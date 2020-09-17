import { ISection } from "./Section";
import { SectionRepository } from "./SectionRepository";
import { SectionService, ISectionService } from "./SectionService";

export interface ISectionController {
    insertOne({ text, productId }: Pick<ISection, "text" | "productId">): Promise<ISection>
    findOne(id: Pick<ISection, "id">): Promise<ISection>
    findAll(productId: Pick<ISection, "productId">):Promise<ISection[]>
    updateOne(description: Partial<ISection>): Promise<ISection>
    deleteOne(id: Pick<ISection, "id">): Promise<Boolean>
}

class SectionController implements ISectionController {
    service: ISectionService
    constructor(service: ISectionService) {
        this.service = service
    }
    public async insertOne({ text, productId }: Pick<ISection, "text" | "productId">): Promise<ISection> {
        try {
            const result = await this.service.insertOne({text, productId})
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll(productId: Pick<ISection, "productId">) {
        try {
            const result = await this.service.findAll(productId)
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
            const result = await this.service.findOne(id)
            return result
        } catch (error) {
            return error
        }
    }

    public async updateOne(description: Partial<ISection>): Promise<ISection> {
        if (!description.id) {
            throw new Error('Id is required')
        }
        try {
            const result = await this.service.updateOne(description)
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
            const result = await this.service.deleteOne(id)
            return result
        } catch (error) {
            return error
        }
    }
}

export const sectionController = new SectionController(new SectionService( new SectionRepository()))