import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prismaPost } from '@/lib/createPost'


export const POST = auth(async (req) => {
    const data = await req.json()
    if (req.auth) {
        await prismaPost.post.createPost({
            title: data.title,
            latitude: data.latitude,
            longitude: data.longitude,
            ownerId: data.ownerId,
            description: data.description,
            availableSpots: data.availableSpots,
            name: data.name,
            email: data.email,
            eventTime: data.eventTime
        })
        return NextResponse.json({ message: 'Created Post'}, {status: 201})
    }
    
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})

