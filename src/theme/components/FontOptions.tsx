import React, { useState, useEffect } from 'react'
import { Text, Input, Radio, Button } from '@geist-ui/react'
import { AlignCenter, AlignRight, AlignLeft, Type } from '@geist-ui/react-icons'
import { IFontStyle } from '../../styles/FontStyles'


interface IFontOptionProps {
    state: IFontStyle
    dispatch: any
}

// TODO: Refactor with useReducer

function FontOptions({state, dispatch, ...props }:IFontOptionProps) {
    const [weight, setWeight] = useState<string>(state.fontWeight || 'normal')
    const [size, setSize] = useState<number >(state.fontSize || 12)
    const [align, setAlign] = useState<string>(state.align || 'left')

    useEffect(() => {
        setWeight(() => state.fontWeight || 'normal')
        setSize(() => state.fontSize || 12)
        setAlign(() => state.align || 'left')
    }, [state])

    useEffect(() => {
        dispatch({
            fontWeight: weight,
            fontSize: size,
            align: align
        })
    }, [weight, size, align])

    return (
        <div className="theme--stl">
            <div className="theme--icon">
                <Type />
            </div>
            <Text h4>Yazi Tipi</Text>
            <div className="theme--fields">
                <div>
                    <Text type="secondary" b>Genislik</Text>
                    <Radio.Group useRow={true} value={weight} onChange={(value) => setWeight(value.toString())} size="small">
                        <Radio value="normal">Normal</Radio>
                        <Radio value="lighter">Ince</Radio>
                        <Radio value="bold">Kalin</Radio>
                        <Radio value="bolder">Daha Kalin</Radio>
                    </Radio.Group>
                </div>
                <div>
                    <Text type="secondary" b>Boyut</Text>
                    <Input type="number" value={size.toString()} size="small" width="64px" className="styling--color" onChange={({ target: { valueAsNumber } }) => { setSize(valueAsNumber) }} />
                </div>
                <div>
                    <Text type="secondary" b>Hiza</Text>
                    <Button size="small" auto onClick={() => setAlign('left')} type={align == "left" ? 'secondary-light' : 'abort'} iconRight={<AlignLeft />} />
                    <Button size="small" auto onClick={() => setAlign('center')} type={align == "center" ? 'secondary-light' : 'abort'} iconRight={<AlignCenter />} />
                    <Button size="small" auto onClick={() => setAlign('right')} type={align == "right" ? 'secondary-light' : 'abort'} iconRight={<AlignRight />} />
                </div>
            </div>
        </div>
    );
}

export default FontOptions
