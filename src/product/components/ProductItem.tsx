import React, { KeyboardEvent, useEffect, useState } from 'react'
import { BrowserWindow } from 'electron'
import { Button, ButtonGroup, Loading, Select } from '@geist-ui/react'
import { Code, Play, Trash2 } from '@geist-ui/react-icons'
import { productController } from '../ProductController'
import { IProduct } from '../Product'
import SectionList from '../../section/components/SectionList'

import './styles/product.scss'
import { eventEmitter, events } from '../../utils/events'
import { Note } from '@geist-ui/react/dist/note/note'
import { themeController } from '../../theme/ThemeController'
import { ITheme, Style, Theme } from '../../theme/Theme'
import { sectionController } from '../../section/SectionController'
import { descriptionController } from '../../description/DescriptionController'
import { ISection } from '../../section/Section'
import { IDescription } from '../../description/Description'

type ProductItemProps = {
    product: IProduct
}

async function* asyncDescriptionGenerator(s: ISection[]) {
    let i = 0
    while (i < s.length) {
        yield descriptionController.findAll({ sectionId: s[i].id });
        i++
    }
}

function ProductItem({ product, ...props }: ProductItemProps) {

    const [updatedText, setUpdatedText] = useState<string>('')
    const [themes, setThemes] = useState<ITheme[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const onHandleBlur = () => {
        if (updatedText) {
            onUpdate()
        }
    }

    const onUpdate = async () => {
        if (updatedText === product.text) {
            return false
        }
        setLoading(true)
        try {
            await productController.updateOne({ text: updatedText, id: product.id })
            eventEmitter.emit(events.listAllProducts)
            setUpdatedText('')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onThemeUpdate = async (value: string) => {
        if (!value) {
            return false
        }
        setLoading(true)
        try {
            await productController.updateOne({ themeId: value, id: product.id })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        setLoading(true)
        try {
            await productController.deleteOne({ id: product.id })
            eventEmitter.emit(events.listAllProducts)
            eventEmitter.emit(events.content, { type: "Yeni Urun" })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onEnter = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onUpdate()
        }
    }

    const fetchSectionsWithDescriptions = async () => {
        try {
            const sections = await sectionController.findAll({ productId: product.id })
            const sectionsWithDescriptions = sections.map((section: ISection) => ({ title: section.text, descriptions: [] }))

            let index = 0

            for await (const description of asyncDescriptionGenerator(sections)) {

                const desc = description.map((des: IDescription) => des.text)
                sectionsWithDescriptions[index] = { ...sectionsWithDescriptions[index], descriptions: desc }
                index++

            }
            return sectionsWithDescriptions

        } catch (error) {
            console.error(error)
        }
    }

    const fetchSelectedTheme = async () => {
        try {
            if (!product.themeId) {
                return undefined
            }
            const theme = await themeController.findOne({ id: product.themeId })
            return theme
        } catch (error) {

        }
    }

    const createHtmlStringWithStyle = (sectionWithDescriptions: any, selectedTheme?: ITheme) => {

        const rawProduct = {
            productTitle: product.text,
            theme: selectedTheme ? new Theme({ ...selectedTheme }) : undefined,
            sections: sectionWithDescriptions
        }
        const productTitleStyle = new Style({ ...rawProduct.theme?.productTitle })
        const sectionTitleStyle = new Style({ ...rawProduct.theme?.section })
        const descriptionStyle = new Style({ ...rawProduct.theme?.description })

        let htmlString = `<h1 style="${productTitleStyle.createCssString()}">${rawProduct.productTitle}</h1>`

        rawProduct.sections.forEach((s: any) => {
            htmlString += `<section><h4 style="${sectionTitleStyle.createCssString()}">${s.title}</h4>`
            htmlString += '<ul>'
            s.descriptions.forEach((d: any) => {
                htmlString += `<li style="${descriptionStyle.createCssString()}">${d}</li>`
            })
            htmlString += '</ul></section>'
        })

        return htmlString
    }
    const loadView = (htmlString: string) => {
        return (`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${product.text} On Izleme</title>
              <style> body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;}</style>
              <meta charset="UTF-8">
            </head>
            <body>
                ${htmlString}
            </body>
          </html>
        `)
    }

    const onCrate = async () => {
        try {

            const sectionsWithDescriptions = await fetchSectionsWithDescriptions()
            const selectedTheme = await fetchSelectedTheme()
            const htmlstring = createHtmlStringWithStyle(sectionsWithDescriptions, selectedTheme)
            
            const file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(loadView(`<code>${htmlstring.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`))
            window.open(file)

        } catch (error) {
            console.error(error)
        }
    }

    const onOnPreview = async () => {
        try {

            const sectionsWithDescriptions = await fetchSectionsWithDescriptions()
            const selectedTheme = await fetchSelectedTheme()
            const htmlstring = createHtmlStringWithStyle(sectionsWithDescriptions, selectedTheme)
      
            const file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(loadView(htmlstring))
            window.open(file)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const onFindAllThemes = async () => {
            setLoading(true)
            try {
                const result = await themeController.findAll()
                setThemes(result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        onFindAllThemes()

        eventEmitter.on(events.listAllThemes, onFindAllThemes)

        return () => {
            eventEmitter.removeAllListeners(events.listAllThemes)
        }
    }, [])

    if (!product) {
        return null
    }

    if (!product.text && !product.id) {
        return null
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="product--item">
                <div className="product--item__menu">
                    <ButtonGroup size="small" type="warning" ghost>
                        <Button onClick={onOnPreview} icon={<Play />}>Onizleme</Button>
                        <Button onClick={onCrate} icon={<Code />}>Olustur</Button>
                        <Button onClick={onDelete} icon={<Trash2 />}>Sil</Button>
                    </ButtonGroup>
                    <Select value={product.themeId} onChange={(val) => onThemeUpdate(val.toString())} size="small" placeholder="Tema Sec" pure>
                        {
                            themes && themes.length > 0 && themes.map((theme) => (
                                <Select.Option key={theme.id} value={theme.id}>{theme.name}</Select.Option>
                            ))
                        }
                    </Select>
                </div>

                <div className="product--item__input">
                    <textarea
                        id={`prod_${product.id}`}
                        name='product_item'
                        placeholder="Urun Ekle"
                        rows={1}
                        value={updatedText || product.text}
                        onChange={({ target: { value } }) => setUpdatedText(value)}
                        onBlur={onHandleBlur}
                        onKeyPress={onEnter}
                    />
                </div>
            </div>
            <SectionList productId={product.id} />
        </>
    );
}

export default ProductItem
