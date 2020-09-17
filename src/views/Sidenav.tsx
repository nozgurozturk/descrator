import React from 'react';
import { Tree, Button, Input } from '@geist-ui/react'
import { Plus, Trello } from '@geist-ui/react-icons'
import Search from './Search';
import ProductList from '../product/components/ProductList';
import { eventEmitter, events } from '../utils/events';
import ThemeList from '../theme/components/ThemeList';
function Sidenav() {

    const onNewContent = (type: string) => {
        eventEmitter.emit(events.content, { type })
    }

    return (
        <nav>
            <Search />
            <Tree>
                <Tree.Folder name="Asetler">
                    <Tree.File name="Bannerlar" />
                </Tree.Folder>
                <ThemeList />
                <ProductList />
            </Tree>
            <div className="nav-add">
                <Button onClick={() => { onNewContent('Yeni Tema') }} type="abort" icon={<Plus />}>Yeni Teme Ekle</Button>
                <Button onClick={() => { onNewContent('Yeni Urun') }} type="abort" icon={< Plus />}> Yeni Urun Ekle</Button>
            </div>
        </nav>

    );
}

export default Sidenav