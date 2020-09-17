import React, { useState, useEffect } from 'react'
import { Loading, Tree } from '@geist-ui/react'

import { eventEmitter, events } from '../../utils/events'
import { ITheme } from '../Theme'
import { themeController } from '../ThemeController'

function ThemeList({ ...props }) {

    const [themes, setThemes] = useState<[ITheme?]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleThemeClick = (theme?:ITheme) => {
        eventEmitter.emit(events.content, {type:'Temalar', payload: theme})
        
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

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <Tree.Folder extra={themes.length.toString()} name="Temalar">
            {themes && themes.length > 0 &&
                themes.map((theme, index) => (
                    <Tree.File onClick={() => { handleThemeClick(theme)}} key={index} name={theme!.name} />
                ))
            }
        </Tree.Folder>
    );
}

export default ThemeList
