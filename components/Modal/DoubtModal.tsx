'use client'

import React, { useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/axios';

interface ModalProps {
    title: string
    id: string
}

const answerSchema = z.object({
    author: z.string(),
    content: z.string()
})

type answerData = z.infer<typeof answerSchema>

export function DoubtModal(props: ModalProps) {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<answerData>({
        resolver: zodResolver(answerSchema)
    })

    async function handleCreateAnswer(data: answerData) {
        const { author, content } = data

        try {
            await api.post(`/answer/${props.id}`, {
                author,
                content
            })
        } catch (err) { }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className='hover:underline'>Responder</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[180vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-blue-450 font-bold text-3xl">
                        {props.title}
                    </Dialog.Title>
                    <Dialog.Description className="text-black text-md">
                        Deixe sua resposta
                    </Dialog.Description>
                    <form onSubmit={handleSubmit(handleCreateAnswer)} className="w-full flex flex-col items-center justify-center gap-y-4 pt-12">
                        <div className='w-full flex flex-col items-center justify-between gap-y-4'>
                            <input {...register('author')} type="text" placeholder='Nome' className='border-2 border-solid border-black rounded w-full text-black py-2' />
                            <textarea {...register('content')} className='border-2 border-solid border-black rounded w-full text-black' placeholder='Sua resposta' cols={30} rows={10} />
                        </div>
                        <button className='bg-blue-450 text-white py-2 px-4 rounded hover:bg-blue-450/80 transition-colors disabled:cursor-not-allowed' disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando' : 'Enviar'}
                        </button>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-black hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            X
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}