import { r2 } from "@/lib/cloudfare"
import { prisma } from "@/lib/prisma"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: Request) {
    const uploadSchema = z.object({
        data: z.string(),
        contentType: z.string().regex(/^(image|video)\/[a-zA-Z]+/)
    })

    const { contentType, data } = uploadSchema.parse(await req.json())

    const fileKey = randomUUID().concat('-').concat(data)

    const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
            Bucket: 'ser-autista',
            Key: fileKey,
            ContentType: contentType
        })
    )

    const file = await prisma.images.create({
        data: {
            id: randomUUID(),
            key: fileKey,
        }
    })

    return NextResponse.json({ signedUrl, fileId: file.id })

}