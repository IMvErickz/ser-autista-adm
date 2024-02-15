import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: Request) {
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
        await prisma.professional.create({
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
        await prisma.professional.create({
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
        await prisma.professional.create({
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

export async function GET() {
    const professional = await prisma.professional.findMany()

    return NextResponse.json({ professional })
}