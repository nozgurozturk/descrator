export interface IProduct {
    readonly id: string
    isFavorite: boolean
    themeId: string,
    text: string
    created: Date
    updated?: Date | null
}

export class Product implements IProduct {
    readonly id: string
    isFavorite: boolean
    themeId: string
    text: string
    created: Date
    updated?: Date | null

    constructor({id, isFavorite, themeId, text, created, updated}:IProduct) {
        this.id = id
        this.isFavorite = isFavorite
        this.text = text
        this.themeId = themeId
        this.created = created
        this.updated = updated
    }
}