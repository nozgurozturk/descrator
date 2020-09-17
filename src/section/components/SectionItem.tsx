import React, { useState, KeyboardEvent } from 'react'
import { Button } from '@geist-ui/react'
import { Trash, Trash2 } from '@geist-ui/react-icons'
import { sectionController } from '../SectionController'
import { ISection } from '../Section'
import DescriptionList from '../../description/components/DescriptionList'
import { eventEmitter, events } from '../../utils/events'

type SectionItemProps = {
    section: ISection
}

function SectionItem({ section, ...props }: SectionItemProps) {
    const { text, id, productId } = section

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
            await sectionController.updateOne({ text: updatedText, id })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            await sectionController.deleteOne({ id })
            eventEmitter.emit(events.listAllSections, {id: productId})
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
        <>
            <div
                className="section--item"
                onMouseEnter={() => setDeleteVisible(true)}
                onMouseLeave={() => setDeleteVisible(false)}
            >
                {isDeleteVisible &&
                    <div className="section--item__delete">
                        <Button onClick={onDelete} auto size="mini" iconRight={<Trash2 />} />
                    </div>
                }
                <div className="section--item__input">
                    <textarea
                        id={`sect_${id}`}
                        name='section_item'
                        placeholder="Bolum Ekle"
                        rows={1}
                        value={updatedText}
                        onChange={({ target: { value } }) => setUpdatedText(value)}
                        onFocus={onHandleFocus}
                        onBlur={onHandleBlur}
                        onKeyPress={onEnterKey}
                    />
                </div>
            </div>
            <DescriptionList sectionId={id} />
        </>
    );
}

export default SectionItem
