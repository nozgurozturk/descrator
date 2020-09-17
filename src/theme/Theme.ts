import { ColorStyles, IColorStyle } from "../styles/ColorStyles"
import { FontStyle, IFontStyle } from "../styles/FontStyles"
import { IListStyle, ListStyle } from "../styles/ListStyles"
import { ISpaceStyle, SpaceStyle } from "../styles/SpaceStyles"


export interface IStyle {
    color?: IColorStyle
    font?: IFontStyle
    list?: IListStyle
    spacing?: ISpaceStyle
}

export interface ITheme {
    readonly id: string
    name: string
    productTitle: Omit<IStyle, "list">
    section:  Omit<IStyle, "list">
    description: IStyle
    created: Date
    updated?: Date | null
}

export class Style  implements IStyle{
    color?: IColorStyle
    font?: IFontStyle
    list?: IListStyle
    spacing?: ISpaceStyle
    constructor(style:Partial<IStyle>) {
        this.color = style.color
        this.font = style.font
        this.list = style.list
        this.spacing = style.spacing
    }

    public createCssString() {
        const colorCSS = this.color ? new ColorStyles({...this.color}).createCSS() : ''
        const listCSS = this.list ? new ListStyle({...this.list}).createCSS!() : ''
        const spacingCSS = this.spacing ? new SpaceStyle({...this.spacing}).createCSS!() : ''
        const fontCSS = this.font ? new FontStyle({...this.font}).createCSS!() : ''
         return  colorCSS + listCSS + spacingCSS + fontCSS
    }
}

export class Theme implements ITheme {
    readonly id: string
    name: string
    productTitle: IStyle
    section: IStyle
    description: IStyle
    created: Date
    updated?: Date | null

    constructor({id, name, productTitle, section, description, created, updated}:ITheme) {
        this.id = id
        this.name = name
        this.productTitle = productTitle
        this.section = section
        this.description = description
        this.created = created
        this.updated = updated
    }
}