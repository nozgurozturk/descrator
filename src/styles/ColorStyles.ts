
export interface IColorStyle {
    foregroundColor?: string
    backgroundColor?: string

}

export class ColorStyles implements IColorStyle{
    foregroundColor?: string
    backgroundColor?: string

    constructor({foregroundColor, backgroundColor}:IColorStyle) {
        this.foregroundColor = foregroundColor
        this.backgroundColor = backgroundColor
    }

    private createCSSElement(value:any, element:string, suffix?:string):string {
        if (value) {
            return ` ${element}:${value}${suffix ? suffix : ''};`
        } 
        return ''
    }

    public createCSS():string {
        
        const backgroundColorCSS = this.createCSSElement(this.backgroundColor, 'background-color')
        const foregroundColorCSS = this.createCSSElement(this.foregroundColor, 'color')

        return backgroundColorCSS + foregroundColorCSS 
    }
}