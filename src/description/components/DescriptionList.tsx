import React, { useState, useEffect } from 'react'
import { descriptionController } from '../DescriptionController'
import { IDescription } from '../Description'
import DescriptionItem from './DescriptionItem'
import DescriptionNew from './DescriptionNew'
import { Loading } from '@geist-ui/react'

import './styles/description.scss'
import { eventEmitter, events } from '../../utils/events'

type DescriptionListProps = {
    sectionId: string
}

function DescriptionList({ sectionId, ...props }: DescriptionListProps) {
    const [descriptions, setDescriptions] = useState<[IDescription?]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onFindAllDescriptions = async () => {
        setLoading(true)
        try {
            const result = await descriptionController.findAll({ sectionId })
            setDescriptions(result)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        onFindAllDescriptions()
    }, [sectionId])

    useEffect(() => {
        eventEmitter.on(events.listAllDescriptions, ({id}) => { 
            if(id === sectionId) {
                onFindAllDescriptions()
            } 
        })
        return () => {
            eventEmitter.removeAllListeners(events.listAllDescriptions)
        }
    }, [])

    if (!sectionId) {
        return null
    }

    return (
        <section className="description--list">
            {descriptions && descriptions.length > 0 &&
                descriptions.map((description, index) => (
                    <DescriptionItem key={index} description={description!} />
                ))}
            {loading &&
                <Loading />
            }
            <DescriptionNew sectionId={sectionId} />
        </section>
    );
}

export default DescriptionList
