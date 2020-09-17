import React, { useState, KeyboardEvent } from 'react'
import { Textarea } from '@geist-ui/react'
import { sectionController } from '../SectionController'
import { eventEmitter, events } from '../../utils/events'

type SectionNewProps = { 
    productId: string
}

function SectionNew({productId, ...props }: SectionNewProps) {
    
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const onInsert = async () => {
        if (!text) {
            return false
        }
        setLoading(true)
        try {
            const result = await sectionController.insertOne({productId, text})
            if (!result) {
                throw new Error('Section is not created')
            }
            eventEmitter.emit(events.listAllSections, {id: productId})
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onEnterKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onInsert()
        }
    }

    return (
        <div className="section--new">
            <textarea
                className="section--new__input"
                disabled={loading}
                placeholder="+ Bolum Ekle"
                rows={1}
                onChange={({ target: { value } }) => setText(value)}
                onBlur={onInsert}
                onKeyPress={onEnterKey}
            />
        </div>
    );
}

export default SectionNew
