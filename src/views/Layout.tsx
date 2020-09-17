import React, { ReactNode, useState } from 'react'
import Sidenav from './Sidenav'
import Content from './Content'

import './styles/_layout.scss'

type LayoutProps = {
    children?: ReactNode[]
}

function Layout({ children, ...props }: LayoutProps) {
    return (
        <>
            <Sidenav />
            <Content />
        </>
    );
}

export default Layout;
