import React, { ReactNode, useEffect, useState,  } from 'react'
import DescriptionList from '../description/components/DescriptionList'
import ProductItem from '../product/components/ProductItem';
import ProductNew from '../product/components/ProductNew';
import ColorStyling from '../theme/components/ColorOptions';
import SpaceStyling from '../theme/components/SpaceOptions';
import ThemeItem from '../theme/components/ThemeItem';
import ThemeNew from '../theme/components/ThemeNew';
import { eventEmitter, events } from '../utils/events';
import BreadCrumbs from './Breadcrumbs';
import Home from './Home';

type Content = {
    selectedContent?: any,
    children?: ReactNode[]
}

function Content({ selectedContent, children, ...props }: Content) {
    const [type, setType] = useState<string>('')
    const [content, setContent] = useState<any>(null)

    useEffect(() => {
        eventEmitter.on(events.content, ({ type, payload }: any) => {
            setType(() => type)
            setContent(() => payload)
        })
    }, [])

    return (
        <main>
            <BreadCrumbs type={type} content={content} />
            {!type && <Home />}
            { type === 'Yeni Tema' && <ThemeNew />}
            { type === 'Temalar' && <ThemeItem theme={content} />}
            { type === 'Yeni Urun' && <ProductNew />}
            { type === 'Urunler' && <ProductItem product={content} />}
        </main>
    );
}

export default Content;
