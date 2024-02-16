'use client'

import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ProfessionalProps {
    id: string
    name: string
    number: string
    address: string
    email: string
    imageUrl: string
    specialty: string
    description: string
}

export function TableProfessional() {
    const [data, setData] = useState<ProfessionalProps[]>([])

    async function getProfessional() {
        const response = await api.get('/professional')
        setData(response.data.professional)

    }

    useEffect(() => { getProfessional() }, [])

    return (
        <div className="w-full relative overflow-x-auto">
            <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Número
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Endereço
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                URL da Imagem
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Especialidade
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(professional => {
                            return (
                                <tr key={professional.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {professional.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {professional.number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {professional.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {professional.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a className="hover:underline" href={professional.imageUrl} target="_blank">{professional.imageUrl}</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {professional.specialty}
                                    </td>
                                    <td className="px-6 py-4">
                                        {professional.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/professional/update/${professional.id}`}>
                                            Atualizar
                                        </Link>
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