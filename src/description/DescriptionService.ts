import { v4 as uuid } from 'uuid'
import { IDescription, Description } from "./Description";
import { IDescriptionRepository } from "./DescriptionRepository";

export interface IDescriptionService {
    insertOne({ text, sectionId }: Pick<IDescription, "text" | "sectionId">): Promise<IDescription>
    findOne(id: Pick<IDescription, "id">): Promise<IDescription>
    findAll(sectionId: Pick<IDescription, "sectionId">):Promise<IDescription[]>
    updateOne(description: Partial<IDescription>): Promise<IDescription>
    deleteOne(id: Pick<IDescription, "id">): Promise<Boolean>
}

export class DescriptionService implements IDescriptionService {
    repository: IDescriptionRepository
    constructor(repository: IDescriptionRepository) {
        this.repository = repository
    }

    public async insertOne({ text, order, sectionId }: Pick<IDescription, "text" | "order" | "sectionId">): Promise<IDescription> {
        if (!text) {
            throw new Error('Text is required')
        }
        if (!sectionId) {
            throw new Error('SectionId is required')
        }
        try {
            const description: IDescription = new Description({
                id: uuid(),
                order: order,
                sectionId: sectionId,
                text: text,
                created: new Date(),
                updated: null
            })
            const result = await this.repository.insertOne(description)
            return result
        } catch (error) {
            return error
        }
    }

    public async findAll(sectionId: Pick<IDescription, "sectionId">):Promise<IDescription[]> {
        if(!sectionId) {
            throw new Error("SectionId is required")
        }
        try {
            const result = await this.repository.findAll(sectionId)
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
            const result = await this.repository.findOne(id)
            return result
        } catch (error) {
            return error
        }
    }

    public async updateOne(description: Partial<IDescription>): Promise<IDescription>{
        if (!description.id) {
            throw new Error('Id is required')
        }
        try {
            description.updated = new Date()
            const result = await this.repository.updateOne(description)
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
            const result = await this.repository.deleteOne(id)
            return result
        } catch (error) {
            return error
        }
    }

}