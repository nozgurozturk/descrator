import { IDescription } from "./Description";
import { DescriptionRepository } from "./DescriptionRepository";
import { DescriptionService, IDescriptionService } from "./DescriptionService";

export interface IDescriptionController {
    insertOne({ text, sectionId }: Pick<IDescription, "text" | "sectionId">): Promise<IDescription>
    findOne(id: Pick<IDescription, "id">): Promise<IDescription>
    findAll(sectionId: Pick<IDescription, "sectionId">):Promise<IDescription[]>
    updateOne(description: Partial<IDescription>): Promise<IDescription>
    deleteOne(id: Pick<IDescription, "id">): Promise<Boolean>
}

class DescriptionController implements IDescriptionController {
    service: IDescriptionService
    constructor(service: IDescriptionService) {
        this.service = service
    }
    public async insertOne({ text, sectionId }: Pick<IDescription, "text" | "sectionId">): Promise<IDescription> {
        try {
            const result = await this.service.insertOne({text, sectionId})
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll(sectionId: Pick<IDescription, "sectionId">) {
        try {
            const result = await this.service.findAll(sectionId)
            return result
        } catch (error) {
            return error
        }
    }

    public async findOne(id: Pick<IDescription, "id">): Promise<IDescription> {
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

    public async updateOne(description: Partial<IDescription>): Promise<IDescription> {
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

    public async deleteOne(id: Pick<IDescription, "id">): Promise<Boolean> {
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

export const descriptionController = new DescriptionController(new DescriptionService( new DescriptionRepository()))