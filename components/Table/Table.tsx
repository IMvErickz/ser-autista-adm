'use client'

import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface TableProps {
    path: string
}

interface NewsProps {
    id: string
    title: string
    titleExcert: string
    imgUrl: string
    excert: string
}

export function Table(props: TableProps) {

    const [data, setData] = useState<NewsProps[]>([])

    async function getNews() {
        const res = await api.get('/news')
        setData(res.data.response)
    }

    useEffect(() => {
        getNews()
    }, [])

    async function handleDeletePublish(id: string) {
        await api.delete(`/news/${id}`)
        window.location.reload()
    }

    return (
        <div className="w-full relative overflow-x-auto">
            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Título
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Conteúdo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                URL da Imagem
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(news => {
                            return (
                                <tr key={news.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {news.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {news.excert}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a className="hover:underline" href={news.imgUrl} target="_blank">{news.imgUrl}</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {props.path == 'update'
                                            ?
                                            <Link href={`/publish/update/${news.id}`} className="hover:underline">
                                                Editar Publicação
                                            </Link>
                                            :
                                            <button onClick={() => handleDeletePublish(news.id)} className="hover:underline text-start">
                                                Excluir Publicação
                                            </button>
                                        }

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    )
}