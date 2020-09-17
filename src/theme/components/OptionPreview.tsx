import React, { CSSProperties, ReactNode, ReactElement } from 'react'
import { Card } from '@geist-ui/react'

interface IOptionPreviewProps {
    styleObject?: CSSProperties
    children?: ReactNode
}

function OptionPreview({ styleObject, children, ...props }: IOptionPreviewProps) {

    return (
        <Card>
            {React.Children.map(children as ReactElement, (child) => (
                React.cloneElement(child, {style:styleObject})
            ))}
        </Card>
    );
}

export default OptionPreview
