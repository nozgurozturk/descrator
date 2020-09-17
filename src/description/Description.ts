export interface IDescription {
    readonly id: string
    sectionId: string
    order: number
    text: string
    created: Date
    updated?: Date | null
}

export class Description implements IDescription {
    readonly id: string
    sectionId: string
    order: number
    text: string
    created: Date
    updated?: Date | null

    constructor({id, sectionId, text, order, created, updated}:IDescription) {
        this.id = id
        this.sectionId = sectionId
        this.order = order
        this.text = text
        this.created = created
        this.updated = updated
    }
}