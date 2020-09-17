export type SpaceType = {
    top: number
    right: number
    bottom: number
    left: number
}

export interface ISpaceStyle {
    padding?: SpaceType
    margin?: SpaceType
}

export class SpaceStyle implements ISpaceStyle {
    padding?: SpaceType
    margin?: SpaceType
    constructor({ padding, margin }: ISpaceStyle) {
        this.padding = {
            top: padding?.top || 0,
            right: padding?.right || 0,
            bottom: padding?.bottom || 0,
            left: padding?.left || 0
        }
        this.margin = {
            top: margin?.top || 0,
            right: margin?.right || 0,
            bottom: margin?.bottom || 0,
            left: margin?.left || 0
        }
    }

    private createCSSElement(spaces: SpaceType, element: string, suffix?: string): string {
        let CSSString = `${element}:`

        const orders:Record<string, number> = {
            top: spaces.top,
            right: spaces.right,
            bottom: spaces.bottom,
            left: spaces.left
        }
        Object.keys(orders).forEach((key:string) => {
            
            CSSString += ` ${orders[key]}${suffix}`
        })

        return `${CSSString};`
    }

    public createCSS(): string {
        const paddingCSS = this.createCSSElement(this.padding!, 'padding', 'px')
        const marginCSS = this.createCSSElement(this.margin!, 'margin', 'px')
        return paddingCSS + marginCSS
    }
}
