import React, { useState, useEffect } from 'react'
import { Text, Input } from '@geist-ui/react'
import { ISpaceStyle, SpaceType } from '../../styles/SpaceStyles'
import { Grid } from '@geist-ui/react-icons'
import "./styles/theme.scss"

interface ISpaceOptionsProps  {
    state: ISpaceStyle,
    dispatch: any
}

function SpaceOptions({state, dispatch, ...props }:ISpaceOptionsProps) {
    const [margin, setMargin] = useState<SpaceType>(state.margin || { top: 0, right: 0, bottom: 0, left: 0 })
    const [padding, setPadding] = useState<SpaceType>(state.padding || { top: 0, right: 0, bottom: 0, left: 0 })

    useEffect(() => {
        dispatch({
            margin: margin,
            padding: padding
        })
    }, [margin, padding])
    
    const inputWidth = '64px'
    return (
        <div className="theme--stl">
            <div className="theme--icon">
                <Grid />
            </div>
            <Text h4>Bosluk</Text>
            <div className="theme--fields">
                <div>
                    <Text type="secondary" b>Ic</Text>
                    <div className="styling--space">
                        <Input size="small" type="number" width={inputWidth} value={padding.top.toString()} onChange={({ target: { value } }) => { setPadding({ ...padding, top: parseInt(value, 10) }) }}>
                            <Text size="small" b>Ust</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={padding.right.toString()} onChange={({ target: { value } }) => { setPadding({ ...padding, right: parseInt(value, 10) }) }}>
                            <Text size="small" b>Sag</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={padding.bottom.toString()} onChange={({ target: { value } }) => { setPadding({ ...padding, bottom: parseInt(value, 10) }) }}>
                            <Text size="small" b>Alt</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={padding.left.toString()} onChange={({ target: { value } }) => { setPadding({ ...padding, left: parseInt(value, 10) }) }}>
                            <Text size="small" b>Sol</Text>
                        </Input>
                    </div>
                </div>
                <div>
                    <Text type="secondary" b>Dis</Text>
                    <div className="styling--space">
                        <Input size="small" type="number" width={inputWidth} value={margin.top.toString()} onChange={({ target: { value } }) => { setMargin({ ...margin, top: parseInt(value, 10) }) }}>
                            <Text size="small" b>Ust</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={margin.right.toString()} onChange={({ target: { value } }) => { setMargin({ ...margin, right: parseInt(value, 10) }) }}>
                            <Text size="small" b>Sag</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={margin.bottom.toString()} onChange={({ target: { value } }) => { setMargin({ ...margin, bottom: parseInt(value, 10) }) }}>
                            <Text size="small" b>Alt</Text>
                        </Input>
                        <Input size="small" type="number" width={inputWidth} value={margin.left.toString()} onChange={({ target: { value } }) => { setMargin({ ...margin, left: parseInt(value, 10) }) }}>
                            <Text size="small" b>Sol</Text>
                        </Input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpaceOptions
