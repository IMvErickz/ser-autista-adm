'use client'

import { Toast } from "@/components/Toast/Toast"
import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface NewsProps {
    title: string
}

const updateSchema = z.object({
    title: z.string(),
    content: z.string()
})

type updateSchemaData = z.infer<typeof updateSchema>

export default function UpdatePublishId({ params }: { params: { id: string } }) {

    const [data, setData] = useState<NewsProps>()
    const [submit, setSubmit] = useState(false)
    const [message, setMessage] = useState('')

    async function getNewId() {
        const res = await api.get(`/news/${params.id}`)
        setData(res.data.news)
    }

    useEffect(() => {
        getNewId()
    }, [])

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<updateSchemaData>({
        resolver: zodResolver(updateSchema)
    })

    const toast = <Toast open={submit} message={message} />

    async function handleUpdateNews(data: updateSchemaData) {
        const { content, title } = data

        try {
            await api.put(`/news/${params.id}`, {
                content,
                title
            })
            setSubmit(true)
            setMessage('Alterado com sucesso')
        } catch (err) {
            setSubmit(true)
            setMessage('Algo de errado aconteceu')
        }
        setTimeout(() => setSubmit(false), 5000)
    }

    return (
        <section className="size-full flex flex-col items-center justify-center gap-y-4">
            <header className="w-full flex items-center justify-center py-20">
                <h1 className="text-blue-450 font-bold text-4xl">Editar Publicação: {data?.title}</h1>
            </header>

            <div className="w-full flex items-center justify-center">
                <form onSubmit={handleSubmit(handleUpdateNews)} className="flex flex-col w-[300px] sm:w-full items-center justify-center gap-y-4 px-10 py-10">
                    <input {...register('title')} type="text" placeholder="Título da publicação" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <textarea {...register('content')} id="" cols={30} rows={10} className="border-2 border-solid border-black p-2 w-full rounded" placeholder="Conteúdo" />
                    <button
                        type="submit"
                        className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors"
                    >
                        {isSubmitting ? 'Carregando' : 'Alterar'}
                    </button>
                </form>
            </div>
            {toast}
        </section>
    )
}