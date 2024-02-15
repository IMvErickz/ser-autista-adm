import { S3Client } from '@aws-sdk/client-s3'
import { env } from './env'

export const r2 = new S3Client({
    region: 'auto',
    endpoint: env.NEXT_PUBLIC_CLOUDFARE_ENDPOINT,
    credentials: {
        accessKeyId: env.NEXT_PUBLIC_CLOUDFARE_ACCESS_KEY_ID,
        secretAccessKey: env.NEXT_PUBLIC_CLOUDFARE_SECRET_ACCESS_KEY
    },
})