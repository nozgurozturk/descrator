import React, { ReactNode, useState } from 'react'
import { Button, Text } from '@geist-ui/react'

import './styles/_layout.scss'

type HomeProps = {
    children?: ReactNode[]
}

function Home({ children, ...props }: HomeProps) {

    return (
        <div>
            <h1>Hosgeldin, Naci</h1>
            <Text>Toplam 123 urun kayitli</Text>
            <Text>Toplam 4 teman var</Text>
        </div>
    );
}

export default Home;
