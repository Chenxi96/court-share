/**
 * @jest-environment node
 */
import { prismaPost } from "../../lib/createPost"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

beforeAll(async() => {
    await prisma.user.create({
        data: {
            name: 'chenxi',
            email: 'example@example.com'
        }
    })
})

afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany()
    const deletePosts = prisma.post.deleteMany()

    await prisma.$transaction([
        deletePosts,
        deleteUsers
    ])

    await prisma.$disconnect()
})

describe('testing database integration', () => {
    it('test create post function', async () => {
        const post = await prismaPost.post.createPost({
            title: 'title',
            latitude: 52.52,
            longitude: 13.405,
            ownerId: 'kdlsfj123',
            description: 'example example example',
            availableSpots: 5,
            name: 'chenxi',
            email: 'example1@example.com'
        })

        const newPost = await prisma.post.findUnique({
            where: {
                id: post.id
            }
        })
        expect(newPost).toEqual(post)
        expect(post).toHaveProperty('id', newPost.id)
    })
})