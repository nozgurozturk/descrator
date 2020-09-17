export interface ISection {
    readonly id: string
    productId: string
    order: number
    text: string
    created: Date
    updated?: Date | null
}

export class Section implements ISection {
    readonly id: string
    productId: string
    order: number
    text: string
    created: Date
    updated?: Date | null

    constructor({id, productId, text, order, created, updated}:ISection) {
        this.id = id
        this.productId = productId
        this.order = order
        this.text = text
        this.created = created
        this.updated = updated
    }
}