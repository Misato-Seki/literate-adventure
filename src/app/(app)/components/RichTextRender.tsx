import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

type Props = {
    data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichTextRender(props: Props) {
    const { className, data, ...rest } = props
    return <RichTextConverter data={data} {...rest} className={className} />
}
