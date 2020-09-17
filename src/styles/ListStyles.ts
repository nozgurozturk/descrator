type ListBulletType = 'none' | 'disc' | 'decimal'

export interface IListStyle {
    bullet?: ListBulletType
}

export class ListStyle implements IListStyle {
    bullet?: ListBulletType
    constructor({bullet }: IListStyle) {
        this.bullet = bullet
    }

    private createCSSElement(value: any, element: string, suffix?: string): string {
        if (value) {
            return `${element}:${value}${suffix ? suffix : ''};`
        }
        return ''
    }

    public createCSS(): string {
        const listBulletTypeCSS = this.createCSSElement(this.bullet, 'list-style')

        return listBulletTypeCSS
    }
}
