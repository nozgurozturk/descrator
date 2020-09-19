import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { Tabs, Button, ButtonGroup } from '@geist-ui/react'
import "./styles/theme.scss"
import { IStyle, ITheme } from '../Theme'
import ThemeOptions from './ThemeOptions'
import { themeController } from '../ThemeController'
import { Trash2, Upload } from '@geist-ui/react-icons'
import { eventEmitter, events } from '../../utils/events'

interface IThemeItemProps {
    theme: ITheme
}

type ActionType = 'description' | 'productTitle' | 'section' | 'all'
type ActionPayload = Partial<IStyle>

type ReducerAction = {
    type: ActionType
    payload: ActionPayload
}

function initializeState(theme:Pick<ITheme, "description" | "productTitle" | "section">): Partial<Pick<ITheme, "description" | "productTitle" | "section">>  {
    return {
        description:theme.description,
        productTitle:theme.productTitle,
        section:theme.section
    }
}

function themeReducer(state: Partial<Pick<ITheme, "description" | "productTitle" | "section">>, action: ReducerAction): Partial<Pick<ITheme, "description" | "productTitle" | "section">>  {
    switch (action.type) {
        case 'description':
            return {
                ...state,
                description: action.payload
            }
        case 'productTitle':
            return {
                ...state,
                productTitle: action.payload
            }
        case 'section':
            return {
                ...state,
                section: action.payload
            }
        case 'all':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

function ThemeItem({ theme, ...props }: IThemeItemProps) {

    const initialThemeState:Pick<ITheme, "description" | "productTitle" | "section"> = {
            description: theme.description,
            productTitle: theme.productTitle,
            section: theme.section
    } 
    const { name, description, section, productTitle } = theme
    const [themeName, setThemeName] = useState<string>('')
    const memoizedThemeReducer = useCallback((state: Partial<Pick<ITheme, "description" | "productTitle" | "section">>, action: ReducerAction) => themeReducer(state, action), [name, description, section, productTitle ])
    const [state, dispatch] = useReducer(memoizedThemeReducer, initialThemeState, initializeState)

    const updateTheme = async () => {
        try {
            const result = await themeController.updateOne({ id: theme.id, name, ...state })
            if (!result) {
                throw new Error('Theme is not updated')
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const deleteTheme = async () => {
        try {
            await themeController.deleteOne({ id: theme.id })
            eventEmitter.emit(events.listAllThemes)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        dispatch({type:"section", payload: section})
        dispatch({type: 'productTitle', payload: productTitle})
        dispatch({type:"description", payload: description}) 
    },[theme]) 
    
    return (
        <div className="theme--new">
            <div className="theme--menu">
                <ButtonGroup size="small" type="warning" ghost>
                    <Button onClick={updateTheme} icon={<Upload />}>Guncelle</Button>
                    <Button onClick={deleteTheme} icon={<Trash2 />}>Sil</Button>
                </ButtonGroup>
            </div>
            <textarea
                className="theme--input"
                placeholder="Tema Ismi"
                rows={1}
                value={themeName || name}
                onChange={({ target: { value } }) => setThemeName(value)}
            />
            <Tabs  initialValue="1">
                <Tabs.Item label="Urun Ismi" value="1">
                    <ThemeOptions
                        states={state.productTitle || productTitle}
                        type="productTitle"
                        dispatcher={dispatch}
                        sample={<div>Ornek Urun Ismi</div>}
                    />
                </Tabs.Item>
                <Tabs.Item  label="Baslik" value="2">
                    <ThemeOptions
                        states={state.section || section}
                        type="section"
                        dispatcher={dispatch}
                        sample={<div>Ornek Baslik</div>}
                    />
                </Tabs.Item>
                <Tabs.Item label="Aciklama" value="3">
                    <ThemeOptions
                        states={state.description || description}
                        type="description"
                        dispatcher={dispatch}
                        sample={[...Array(5)].map((i, index) => (<li key={index}>Ornek Aciklama</li>))}
                    />

                </Tabs.Item>
            </Tabs>
        </div>
    );
}

export default ThemeItem
