import { r2 } from "@/lib/cloudfare"
import { prisma } from "@/lib/prisma"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { imgbox } from "imgbox-js"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const file = await prisma.images.findUniqueOrThrow({
        where: {
            id: params.id
        }
    })


    const signedUrlDownload = await getSignedUrl(
        r2,
        new GetObjectCommand({
            Bucket: 'ser-autista',
            Key: file.key,
        })
    )

    const response = await imgbox(signedUrlDownload)

    console.log("res:", response)

    return NextResponse.json(response)
}