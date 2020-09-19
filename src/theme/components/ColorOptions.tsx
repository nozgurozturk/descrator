import React, { useState, KeyboardEvent, useEffect } from 'react'
import { Text, Input } from '@geist-ui/react'
import { Droplet } from '@geist-ui/react-icons'
import { IColorStyle } from '../../styles/ColorStyles'

interface IColorOptionsProps {
    state: IColorStyle
    dispatch: any
}
// TODO: Refactor with useReducer

function ColorOptions({ state, dispatch, ...props }: IColorOptionsProps) {
    const [foregroundColor, setForegroundColor] = useState<string | undefined >(state.foregroundColor || undefined)
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(state.backgroundColor || undefined)

    useEffect(() => {
        setBackgroundColor(() => state.backgroundColor)
        setForegroundColor(() => state.foregroundColor)
    }, [state])

    useEffect(() => {
        dispatch({ backgroundColor: backgroundColor, foregroundColor: foregroundColor })
    }, [backgroundColor, foregroundColor])
    return (
        <div className="theme--stl">
            <div className="theme--icon">
                <Droplet />
            </div>
            <Text h4>Renk</Text>
            <div className="theme--fields">
                <div>
                    <Text type="secondary" b>Font</Text>
                    <Input size="small" width="42px" className="styling--color" onChange={({ target: { value } }) => { setForegroundColor(value) }} value={foregroundColor} type="color" />
                    <Text type="secondary" style={{ marginLeft: 8 }} size="small">{foregroundColor}</Text>
                </div>
                <div>
                    <Text type="secondary" b>Arka Plan</Text>
                    <Input size="small" width="42px" className="styling--color" onChange={({ target: { value } }) => { setBackgroundColor(value) }} value={backgroundColor} type="color" />
                    <Text type="secondary" style={{ marginLeft: 8 }} size="small">{backgroundColor}</Text>
                </div>
            </div>
        </div>
    );
}

export default ColorOptions
