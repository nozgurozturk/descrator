import React, { useState, KeyboardEvent, useReducer, CSSProperties } from 'react'
import { Tabs, Button } from '@geist-ui/react'
import "./styles/theme.scss"
import { IStyle, ITheme } from '../Theme'
import { IColorStyle } from '../../styles/ColorStyles'
import { IFontStyle } from '../../styles/FontStyles'
import { ISpaceStyle } from '../../styles/SpaceStyles'
import { IListStyle } from '../../styles/ListStyles'
import ThemeOptions from './ThemeOptions'
import { themeController } from '../ThemeController'
import { eventEmitter, events } from '../../utils/events'

type ActionType = 'description' | 'productTitle' | 'section'

type ReducerAction = {
    type: ActionType
    payload: Partial<IStyle>
}

function themeReducer(state: Pick<ITheme, "description" | "productTitle" | "section">, action: ReducerAction): Pick<ITheme, "description" | "productTitle" | "section"> {
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
        default:
            return state
    }
}

function ThemeNew({ ...props }) {
    const initialColorState: IColorStyle = {
        backgroundColor: undefined,
        foregroundColor: '#000000'
    }

    const initialFontState: IFontStyle = {
        align: 'left',
        decoration: 'none',
        fontSize: 12,
        fontWeight: 'normal'
    }

    const initialSpaceState: ISpaceStyle = {
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }
    }

    const initialListState: IListStyle = {
        bullet: 'disc'
    }
    const initialThemeState: Pick<ITheme, "description" | "productTitle" | "section"> = {
        description: {
            color: initialColorState,
            font: initialFontState,
            spacing: initialSpaceState,
            list: initialListState
        },
        productTitle: {
            color: initialColorState,
            font: initialFontState,
            spacing: initialSpaceState
        },
        section: {
            color: initialColorState,
            font: initialFontState,
            spacing: initialSpaceState
        }
    }
    const [name, setName] = useState<string>('')

    const [state, dispatch] = useReducer(themeReducer, initialThemeState)

    const insertTheme = async () => {
        try {
            const result = await themeController.insertOne({name, ...state})
            if (!result) {
                throw new Error('Theme is not inserted into database')
            }
            eventEmitter.emit(events.listAllThemes)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="theme--new">
            <div className="theme--menu">
                <Button onClick={insertTheme} type="success-light" >Ekle</Button>
            </div>
            <textarea
                className="theme--input"
                placeholder="Tema Ismi"
                rows={1}
                value={name}
                onChange={({ target: { value } }) => setName(value)}
            />
            <Tabs initialValue="1">
                <Tabs.Item label="Urun Ismi" value="1">
                    <ThemeOptions
                        states={state.productTitle}
                        type="productTitle"
                        dispatcher={dispatch}
                        sample={<div>Ornek Urun Ismi</div>}
                    />
                </Tabs.Item>
                <Tabs.Item label="Baslik" value="2">
                    <ThemeOptions
                        states={state.section}
                        type="section"
                        dispatcher={dispatch}
                        sample={<div>Ornek Baslik</div>}
                    />
                </Tabs.Item>
                <Tabs.Item label="Aciklama" value="3">
                    <ThemeOptions
                        states={state.description}
                        type="description"
                        dispatcher={dispatch}
                        sample={[...Array(5)].map((i, index) => (<li key={index}>Ornek Aciklama</li>))}
                    />

                </Tabs.Item>
            </Tabs>
        </div>
    );
}

export default ThemeNew
