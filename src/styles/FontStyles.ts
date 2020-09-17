export type FontWeight = 'bold' | 'bolder' | 'lighter' | 'normal'
export type TextAlign = 'center' | 'left' | 'right'
export type TextDecoration = 'underline' | 'line-through' | 'overline' | 'none'

export interface IFontStyle {
    fontWeight?: FontWeight
    fontSize?: number
    align?: TextAlign
    decoration?: TextDecoration
}

export class FontStyle implements IFontStyle {
    fontSize?: number
    fontWeight?: FontWeight
    align?: TextAlign
    decoration?: TextDecoration
    constructor({fontSize, fontWeight, align, decoration}:IFontStyle) {
        this.fontSize = fontSize
        this.fontWeight = fontWeight
        this.align = align
        this.decoration = decoration
    }

    private createCSSElement(value:any, element:string, suffix?:string):string {
        if (value) {
            return ` ${element}:${value}${suffix ? suffix : ''};`
        } 
        return ''
    }

    public createCSS():string {
        const fontSizeCSS = this.createCSSElement(this.fontSize, 'font-size', 'px')
        const fontWeightCSS = this.createCSSElement(this.fontWeight, 'font-weight')
        const textAlignCSS = this.createCSSElement(this.align, 'text-align')
        const textDecorationCSS = this.createCSSElement(this.decoration, 'text-decoration')

        return fontSizeCSS + fontWeightCSS + textAlignCSS + textDecorationCSS
    }
}
