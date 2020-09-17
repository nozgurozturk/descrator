import React, { ReactNode, useState, useRef, KeyboardEvent } from 'react'
import { Textarea } from '@geist-ui/react'
import { descriptionController } from '../DescriptionController'
import { eventEmitter, events } from '../../utils/events'

type DescriptionNewProps = { 
    sectionId: string
}

function DescriptionNew({sectionId, ...props }: DescriptionNewProps) {
    
    const [text, setText] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const onInsert = async () => {
        if (!text) {
            return false
        }
        setLoading(true)
        try {
            const result = await descriptionController.insertOne({sectionId, text})
            if (!result) {
                throw new Error('Description not created')
            }
            setText('')
            eventEmitter.emit(events.listAllDescriptions, {id: sectionId})
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
        <div className="description--new">
            <textarea
                className="description--new__input"
                disabled={loading}
                placeholder="+ Aciklama Ekle"
                rows={1}
                value={text}
                onChange={({ target: { value } }) => setText(value)}
                onBlur={onInsert}
                onKeyPress={onEnterKey}
            />
        </div>
    );
}

export default DescriptionNew
