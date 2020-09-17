import React, { KeyboardEvent, useState } from 'react'
import { eventEmitter, events } from '../../utils/events'
import { productController } from '../ProductController'

import './styles/product.scss'

function ProductNew({...props }) {
    
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const onInsert = async () => {
        if (!text) {
            return false
        }
        setLoading(true)
        try {
            const result = await productController.insertOne({text:text})
            eventEmitter.emit(events.content, {type:'Urunler', payload: result})
            eventEmitter.emit(events.listAllProducts)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onEnter = (event:KeyboardEvent) => {
        if (event.key === 'Enter') {
            onInsert()
        }
    }

    return (
        <div className="product--new">
            <textarea
                className="product--new__input"
                disabled={loading}
                placeholder="Urun Ekle"
                rows={1}
                onChange={({ target: { value } }) => setText(value)}
                onBlur={onInsert}
                onKeyPress={onEnter}
            />
        </div>
    );
}

export default ProductNew
