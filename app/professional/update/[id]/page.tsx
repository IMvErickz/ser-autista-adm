'use client'

import { api } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerProfessionalSchema = z.object({
    name: z.string().nullable(),
    number: z.string().nullable(),
    email: z.string(),
    address: z.string().nullable(),
    specialty: z.string().nullable(),
    description: z.string().nullable()
})

type registerProfessionalData = z.infer<typeof registerProfessionalSchema>

export default function UpdateProfessional({ params }: { params: { id: string } }) {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<registerProfessionalData>({
        resolver: zodResolver(registerProfessionalSchema)
    })

    async function handleRegisterProfessional(data: registerProfessionalData) {
        const { name, number, address, email, specialty, description } = data

        try {
            await api.put(`/professional/${params.id}`, {
                name,
                number,
                address,
                email,
                specialty,
                description
            })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className="w-full h-full flex flex-col items-center justify-center py-10 gap-y-8">
            <header className="w-full flex items-center justify-center pt-10">
                <h1 className="text-blue-450 font-bold text-4xl">
                    Atualizar Profissional
                </h1>
            </header>

            <div className="w-full flex flex-col items-center justify-center px-40">
                <form onSubmit={handleSubmit(handleRegisterProfessional)} className="flex flex-col w-[300px] sm:w-full items-center justify-center gap-y-4 px-10 py-10">
                    <input {...register('name')} type="text" placeholder="Nome" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('number')} type="text" placeholder="Número" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('email')} type="text" placeholder="email (opcional)" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('address')} type="text" placeholder="Endereço (opcional)" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('specialty')} type="text" placeholder="Especialidade" className="border-2 border-solid border-black p-2 w-full rounded" />
                    <input {...register('description')} type="text" placeholder="Descrição" className="border-2 border-solid border-black p-2 w-full rounded" />
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