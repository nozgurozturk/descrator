import React, { useState, useEffect } from 'react'
import { Text, Button } from '@geist-ui/react'
import { List, ZeroConfig } from '@geist-ui/react-icons'
import { IListStyle } from '../../styles/ListStyles'

interface IListOptionsProps {
    state: IListStyle
    dispatch: any
}

// TODO: Refactor with useReducer

function ListOptions({ state, dispatch, ...props }: IListOptionsProps) {
    const [bullet, setBullet] = useState<string>(state.bullet || '')
    useEffect(() => {
        setBullet(() => state.bullet || '')
    }, [state])
    useEffect(() => {
        dispatch({ bullet: bullet })
    }, [bullet])
    return (
        <div className="theme--stl">
            <div className="theme--icon">
                <List />
            </div>
            <Text h4>Liste</Text>

            <div className="theme--fields">
                <div>
                    <Text type="secondary" b>Stil</Text>
                    <Button size="small" auto onClick={() => setBullet('disc')} type={bullet === "disc" ? 'secondary-light' : 'abort'} >&#8226;</Button>
                    <Button size="small" auto onClick={() => setBullet('decimal')} type={bullet === "decimal" ? 'secondary-light' : 'abort'}>123</Button>
                    <Button size="small" auto onClick={() => setBullet('none')} type={bullet === "none" ? 'secondary-light' : 'abort'} iconRight={<ZeroConfig />} />
                </div>
            </div>
        </div>
    );
}

export default ListOptions
