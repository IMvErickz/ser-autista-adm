'use client'

import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerProfessionalSchema = z.object({
    name: z.string(),
    number: z.string(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    file: z.any()
})

type registerProfessionalData = z.infer<typeof registerProfessionalSchema>

export default function CreateProfessional() {
    const [preview, setPreview] = useState<string | null>(null)
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<registerProfessionalData>({
        resolver: zodResolver(registerProfessionalSchema)
    })

    function onMediaSelect(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }

        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)
    }

    async function handleRegisterProfessional(data: registerProfessionalData) {
        const { name, number, address, email, file } = data

        const fileParse = file[0]

        try {
            const response = await api.post('/upload', {
                data: name,
                contentType: file[0].type
            })


            await axios.put(response.data.signedUrl, fileParse, {
                headers: {
                    'Content-Type': file[0].type
                }
            })

            const responseUrl = await api.get(`/upload/${response.data.fileId}`)

            if (!address) {
                await api.post('/professional', {
                    name,
                    number,
                    email,
                    imageUrl: responseUrl.data.data.map((e: any) => e.original_url)[0]
                })
            } else if (!email) {
                await api.post('/professional', {
                    name,
                    number,
                    address,
                    imageUrl: responseUrl.data.data.map((e: any) => e.original_url)[0]
                })
            } else {
                await api.post('/professional', {
                    name,
                    number,
                    address,
                    email,
                    imageUrl: responseUrl.data.data.map((e: any) => e.original_url)[0]
                })
            }

        } catch (err) {

        }
    }

    return (
        <section className="w-full h-full flex flex-col items-center justify-center py-10 gap-y-8">
            <header className="w-full flex items-center justify-center pt-10">
                <h1 className="text-blue-450 font-bold text-4xl">
                    Cadastrar Profissional
                </h1>
            </header>

            <div className="w-full flex items-center justify-center px-40">
                <form onSubmit={handleSubmit(handleRegisterProfessional)} className="flex flex-col w-[300px] sm:w-full items-center justify-center gap-y-4 px-10 py-10">
                    <input {...register('name')} type="text" placeholder="Nome" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <label htmlFor="file" className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors">Escolher imagem</label>
                    <input {...register('file', {
                        onChange: onMediaSelect,
                    })} id="file" type="file" className="invisible h-0 w-0" />
                    {preview && (<img src={preview} alt="Não encontrado" className="aspect-video w-full rounded-lg object-cover" />)}

                    <input {...register('number')} type="text" placeholder="Número" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('email')} type="text" placeholder="email (opcional)" className="border-2 border-solid border-black p-2 w-full rounded" required={false} />
                    <input {...register('address')} type="text" placeholder="Endereço (opcional)" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <button
                        type="submit"
                        className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors"
                    >
                        {isSubmitting ? 'Carregando' : 'Registrar'}
                    </button>
                </form>
            </div>
        </section>
    )
}