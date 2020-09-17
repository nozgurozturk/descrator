import React from 'react'
import { Breadcrumbs } from '@geist-ui/react'

interface IBreadCrumbProps {
    type?: string,
    content?: any
}

function BreadCrumbs({type, content, ...props }:IBreadCrumbProps) {
    return (
        <Breadcrumbs size="small">
            {type && <Breadcrumbs.Item>{type}</Breadcrumbs.Item>}
            {content && (content.text || content.name) && <Breadcrumbs.Item>{content.text || content.name}</Breadcrumbs.Item>}
        </Breadcrumbs>
    );
}

export default BreadCrumbs;
