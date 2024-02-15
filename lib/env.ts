import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_CLOUDFARE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_CLOUDFARE_ACCESS_KEY_ID: z.string(),
    NEXT_PUBLIC_CLOUDFARE_SECRET_ACCESS_KEY: z.string(),
})

export const env = envSchema.parse(process.env)