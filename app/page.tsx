'use client'

import { MediaPicker } from "@/components/File/MediaPicker";
import { api } from "@/lib/axios";
import axios from "axios";
import { FormEvent, useState } from "react";
import { resolve } from "path";

export default function Home() {

  async function handleCreateNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const file = formData.get('file')
    let fileName
    let fileType
    let fileValue
    let title = formData.get('title')
    let content = formData.get('content')
    if (file instanceof File) {
      fileName = file.name
      fileType = file.type
    }

    const response = await api.post('/upload', {
      data: title,
      contentType: 'image/png'
    })

    await axios.put(response.data.signedUrl, file, {
      headers: {
        'Content-Type': fileType
      }
    })

    const responseUrl = await api.get(`/upload/${response.data.fileId}`)

    await api.post('/news', {
      title,
      content,
      imgUrl: responseUrl.data.data.map((e: any) => e.original_url)[0]
    })

  }

  return (
    <>
      <header className="w-full flex items-center justify-center pt-20">
        <h1 className="font-bold text-blue-450 text-4xl">Administração Ser Autista</h1>
      </header>
      <section className="w-[62.5rem] flex flex-col items-center justify-center py-20">
        <h2 className="font-bold text-blue-450 text-2xl">Nova publicação</h2>

        <form onSubmit={handleCreateNews} className="flex flex-col w-full items-center justify-center gap-y-4">
          <label htmlFor="file" className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors">Escolher imagem</label>
          <MediaPicker />
          <input name="title" type="text" placeholder="Título da publicação" className="border-2 border-solid border-black p-2 w-full rounded" />
          <textarea name="content" id="" cols={30} rows={10} className="border-2 border-solid border-black p-2 w-full rounded" placeholder="Conteúdo" />
          <button type="submit" className="bg-blue-450 text-white rounded py-2 px-4 hover:bg-blue-450/80 transition-colors">Publicar</button>
        </form>
      </section>
    </>
  );
}
