/**
 * @jest-environment node
 */

import { POST } from '@/app/api/posts/route'
import { NextRequest, NextResponse } from 'next/server'
import { prismaPost } from '@/lib/createPost'

jest.mock('../../../auth', () => {
    return {
        auth: jest.fn((handler) => handler)
    }
})

describe('checking route', () => {
    const spy = jest.spyOn(NextResponse, 'json')
    afterEach(() => {
        spy.mockReset();
      });
    it('with Auth Session', async () => {
        const requestBody = {
            id: '314sdc',
            description: 'example',
            availaleSpots: 3,
            title: 'Basketball',
            name: "John Doe",
            email: "johndoe@example.com",
          };
        const req = new NextRequest(new Request('http://localhost:3000/api/post', {
            method: 'POST',
            body: JSON.stringify(requestBody)
        }))
        req.auth = {
            user: {
                name: 'chenxi'
            }
        }
        prismaPost.post.createPost = jest.fn()
        await POST(req)
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ message: 'Created Post'}, {status: 201})
    })

    it('with no Auth session', async () => {
        const requestBody = {
            id: '314sdc',
            description: 'example',
            availableSpots: 3,
            title: 'Basketball',
            name: "John Doe",
            email: "johndoe@example.com",
          };
        const req = new NextRequest(new Request('http://localhost:3000/api/post', {
            method: 'POST',
            body: JSON.stringify(requestBody)
        }))
        await POST(req)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({ message: "Not authenticated" }, { status: 401 })
    })
})
