import React, { useState, KeyboardEvent } from 'react'
import { Button } from '@geist-ui/react'
import { MoreVertical, Trash2 } from '@geist-ui/react-icons'
import { descriptionController } from '../DescriptionController'
import { IDescription } from '../Description'
import { eventEmitter, events } from '../../utils/events'

type DescriptionItemProps = {
    description: IDescription
}

function DescriptionItem({ description, ...props }: DescriptionItemProps) {
    const { text, id, sectionId } = description

    const [updatedText, setUpdatedText] = useState<string>(text)
    const [isDeleteVisible, setDeleteVisible] = useState<boolean>(false)
    const [isFocused, setFocused] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const onHandleFocus = () => {
        setFocused(true)
    }

    const onHandleBlur = () => {
        setFocused(false)
        if (!updatedText) {
            onDelete()
        } else {
            onUpdate()
        }
    }

    const onUpdate = async () => {
        if (updatedText === text) {
            return false
        }
        setLoading(true)
        try {
            await descriptionController.updateOne({ text: updatedText, id })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            await descriptionController.deleteOne({ id })
            eventEmitter.emit(events.listAllDescriptions, {id: sectionId })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const onEnterKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onUpdate()
        }
    }


    if (!text && !id) {
        return null
    }

    return (
        <div
            className="description--item"
            onMouseEnter={() => setDeleteVisible(true)}
            onMouseLeave={() => setDeleteVisible(false)}
        >
            {isDeleteVisible &&
                <div className="description--item__delete">
                    <Button onClick={onDelete} auto size="mini" iconRight={<Trash2 />} />
                </div>
            }
            <div className="description--item__input">
                <textarea
                    id={`desc_${id}`}
                    name='description_item'
                    placeholder="Aciklama Ekle"
                    rows={1}
                    value={updatedText}
                    onChange={({ target: { value } }) => setUpdatedText(value)}
                    onFocus={onHandleFocus}
                    onKeyPress={onEnterKey}
                    onBlur={onHandleBlur}
                />
            </div>
        </div>
    );
}

export default DescriptionItem
