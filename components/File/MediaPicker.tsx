'use client'

import { ChangeEvent, useState } from "react"

export function MediaPicker() {

    const [preview, setPreview] = useState<string | null>(null)

    function onMediaSelect(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }

        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)
    }

    return (
        <>
            <input name="file" onChange={onMediaSelect} id="file" type="file" className="invisible h-0 w-0" />

            {preview && (<img src={preview} alt="Não encontrado" className="aspect-video w-full rounded-lg object-cover" />)}
        </>
    )
}