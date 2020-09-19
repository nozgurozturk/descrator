import React, { useState, KeyboardEvent, useReducer, CSSProperties, ReactNode, ReactElement } from 'react'
import ColorOptions from './ColorOptions'
import FontOptions from './FontOptions'
import SpaceOptions from './SpaceOptions'
import "./styles/theme.scss"
import { IStyle } from '../Theme'
import OptionPreview from './OptionPreview'
import { IColorStyle } from '../../styles/ColorStyles'
import { IFontStyle } from '../../styles/FontStyles'
import { ISpaceStyle } from '../../styles/SpaceStyles'
import ListOptions from './ListOptions'
import { IListStyle } from '../../styles/ListStyles'

interface IThemeOptionsProps {
    states: Partial<IStyle>,
    type: string,
    dispatcher: any,
    sample: ReactNode
}

function ThemeOptions({ states, dispatcher, sample, type, ...props }: IThemeOptionsProps) {
    
    const createStyleObject = (style: IStyle): CSSProperties => {
        return {
            color: style.color?.foregroundColor,
            backgroundColor: style.color?.backgroundColor,
            fontWeight: style.font?.fontWeight,
            fontSize: style.font?.fontSize,
            textAlign: style.font?.align,
            listStyle: style.list?.bullet,
            margin: `${style.spacing?.margin?.top}px ${style.spacing?.margin?.right}px ${style.spacing?.margin?.bottom}px ${style.spacing?.margin?.left}px`,
            padding: `${style.spacing?.padding?.top}px ${style.spacing?.padding?.right}px ${style.spacing?.padding?.bottom}px ${style.spacing?.padding?.left}px`,
        }
    }
    return (

        <section className="theme--options">
            <div>
                
                <ColorOptions state={states.color!} dispatch={(value: IColorStyle) => dispatcher({
                    type, payload: {
                        ...states,
                        color: value
                    }
                })} />
                <SpaceOptions state={states.spacing!} dispatch={(value: ISpaceStyle) => dispatcher({
                    type, payload: {
                        ...states,
                        spacing: value
                    }
                })} />
                <FontOptions state={states.font!} dispatch={(value: IFontStyle) => dispatcher({
                    type, payload: {
                        ...states,
                        font: value
                    }
                })} />
                {states.list &&
                    <ListOptions state={states.list!} dispatch={(value: IListStyle) => dispatcher({
                        type, payload: {
                            ...states,
                            list: value
                        }
                    })} />
                }
            </div>
            <div>
                <OptionPreview styleObject={createStyleObject(states)}>
                    {sample}
                </OptionPreview>
            </div>
        </section>

    );
}

export default ThemeOptions
