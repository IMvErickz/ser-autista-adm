import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const ProfessionalSchema = z.object({
        name: z.string(),
        number: z.string(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        imageUrl: z.string(),
        specialty: z.string(),
        description: z.string()
    })

    const { name, number, address, email, imageUrl, specialty, description } = ProfessionalSchema.parse(await req.json())

    if (email) {
        await prisma.professional.update({
            where: {
                id: params.id
            },
            data: {
                id: randomUUID(),
                name,
                number,
                email,
                imageUrl,
                specialty,
                description,
            }
        })

        return NextResponse.json('success')

    } else if (address) {
        await prisma.professional.update({
            where: {
                id: params.id
            },
            data: {
                id: randomUUID(),
                name,
                number,
                address,
                imageUrl,
                specialty,
                description
            }
        })

        return NextResponse.json('success')

    } else {
        await prisma.professional.update({
            where: {
                id: params.id
            },
            data: {
                id: randomUUID(),
                name,
                number,
                address,
                email,
                imageUrl,
                specialty,
                description
            }
        })

        return NextResponse.json('success')
    }
}