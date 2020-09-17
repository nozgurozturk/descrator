import React, { useState, useEffect } from 'react'
import { sectionController } from '../SectionController'
import { ISection } from '../Section'
import SectionItem from './SectionItem'
import SectionNew from './SectionNew'

import './styles/section.scss'
import { Loading } from '@geist-ui/react'
import { eventEmitter, events } from '../../utils/events'

type SectionListProps = {
    productId: string
}

function SectionList({ productId, ...props }: SectionListProps) {
    const [sections, setSections] = useState<[ISection?]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const onFindAllSections = async () => {
        setLoading(true)
        try {
           const result = await sectionController.findAll({productId})
           setSections(result)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       if(productId) onFindAllSections()
    }, [productId])

    useEffect(() => {
        eventEmitter.on(events.listAllSections, ({id}) => { 
            if(id === productId ) {
                onFindAllSections()
            }
        })
        return () => {
            eventEmitter.removeAllListeners(events.listAllSections)
        }
    }, [])


    if (!productId) {
        return null
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="section--list">
            {sections && sections.length > 0 &&
                sections.map((section, index) => (
                    <SectionItem key={index} section={section!} />
            ))}
            <SectionNew productId={productId} />
        </div>
    );
}

export default SectionList
