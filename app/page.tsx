'use client'

import { MediaPicker } from "@/components/File/MediaPicker";
import { api } from "@/lib/axios";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { resolve } from "path";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "@/components/Toast/Toast";
import Link from "next/link";

const newsSchema = z.object({
  title: z.string(),
  content: z.string(),
  file: z.any()
})

type newsSchemaForm = z.infer<typeof newsSchema>

export default function Home() {

  const [preview, setPreview] = useState<string | null>(null)
  const [submit, setSubmit] = useState(false)
  const [message, setMessage] = useState('')

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<newsSchemaForm>({
    resolver: zodResolver(newsSchema)
  })

  function onMediaSelect(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  const toast = <Toast open={submit} message={message} />


  async function handleCreateNews(data: newsSchemaForm) {
    const { title, content, file } = data

    const fileParse = file[0]

    try {
      const response = await api.post('/upload', {
        data: title,
        contentType: file[0].type
      })


      await axios.put(response.data.signedUrl, fileParse, {
        headers: {
          'Content-Type': file[0].type
        }
      })

      const responseUrl = await api.get(`/upload/${response.data.fileId}`)

      await api.post('/news', {
        title,
        content,
        imgUrl: responseUrl.data.data.map((e: any) => e.original_url)[0]
      })
      setSubmit(true)
      setMessage('Cadastrado com sucesso')
    } catch (err) {
      setSubmit(true)
      setMessage('Algo de errado aconteceu')
    }


    setTimeout(() => setSubmit(false), 5000)

  }

  return (
    <>
      <header className="w-full flex flex-col items-center justify-center pt-20">
        <h1 className="font-bold text-blue-450 sm:text-4xl text-2xl">Administração Ser Autista</h1>
        <div className="w-full flex items-center justify-between px-40 pt-10">
          <Link href={'/publish/update'} className="text-blue-450 font-semibold hover:underline">
            Alterar publicação
          </Link>

          <Link href={'/publish/delete'} className="text-blue-450 font-semibold hover:underline">
            Deletar publicação
          </Link>
        </div>
      </header>
      <section className="w-[62.5rem] flex flex-col items-center justify-center py-20">
        <h2 className="font-bold text-blue-450 text-2xl">Nova publicação</h2>

        <form onSubmit={handleSubmit(handleCreateNews)} className="flex flex-col w-[300px] sm:w-full items-center justify-center gap-y-4">
          <label htmlFor="file" className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors">Escolher imagem</label>

          <input {...register('file', {
            onChange: onMediaSelect,
          })} id="file" type="file" className="invisible h-0 w-0" />
          {preview && (<img src={preview} alt="Não encontrado" className="aspect-video w-full rounded-lg object-cover" />)}

          <input {...register('title')} type="text" placeholder="Título da publicação" className="border-2 border-solid border-black p-2 w-full rounded" />
          <textarea {...register('content')} id="" cols={30} rows={10} className="border-2 border-solid border-black p-2 w-full rounded" placeholder="Conteúdo" />
          <button
            type="submit"
            className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors"
          >
            {isSubmitting ? 'Carregando' : 'Publicar'}
          </button>
        </form>
        {toast}
      </section>
    </>
  );
}
