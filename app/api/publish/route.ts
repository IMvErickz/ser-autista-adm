import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {

    const newsSchema = z.object({
        title: z.string(),
        imgUrl: z.string(),
        content: z.string()
    })

    const { title, content, imgUrl } = newsSchema.parse(await req.json())

    await prisma.news.create({
        data: {
            id: randomUUID(),
            title,
            imgUrl,
            content,
        }
    })

    return NextResponse.json('sucess')
}