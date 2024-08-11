import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import mockRouter from 'next-router-mock';
import Page from '@/pages/p/[id].tsx';
import { getServerSideProps } from "@/pages/p/[id].tsx"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

jest.mock("../../../auth", () => {
  const oneDay = 86400
  const mockSession = {
    expires: new Date(Date.now() + oneDay).toISOString(),
    user: { name: "admin" }
  };
  return {
    auth: jest.fn(() => {
      return mockSession
    })
  }
})

jest.mock('next/dist/client/router', () => jest.requireActual('next-router-mock'))
mockRouter.useParser(createDynamicRouteParser([
    "/[id]"
  ]));

describe('Page', () => {
  const params = { id: 1 }
  const post = {
    id: '1',
    title: 'basketball rental',
    owner: {
        id: 'clvwz3m1f000014f8co42anoq',
        name: 'chenxi',
        email: 'lin.chenxi14@gmail.com'
    },
    ownerId: 'clvwz3m1f000014f8co42anoq',
    createdAt: '2024-05-07T22:49:54.043Z',
    updatedAt: '2024-05-07T00:00:00.000Z'
  }

  it('renders a title', async () => {
    global.prisma.post.findUniqueOrThrow.mockResolvedValue(post)
    const result = await getServerSideProps(params)
    mockRouter.push("/pages/p/1")
    render(<Page {...result.props} />)

    const headingTitle= screen.getByTestId('heading-title')
    expect(headingTitle).toBeInTheDocument()
    expect(headingTitle).toHaveTextContent(result.props.post.title)
  })


  it('renders owner name', async() => {

    global.prisma.post.findUniqueOrThrow.mockResolvedValue(post)
    const result = await getServerSideProps(params)
    mockRouter.push("/pages/p/1")
    render(<Page {...result.props} />)
    const postName = screen.getByTestId('post-name')
    expect(postName).toBeInTheDocument()
    expect(postName).toHaveTextContent(result.props.post.owner.name)
  })

  it('renders page when props is null', async () => {
    
      global.prisma.post.findUniqueOrThrow.mockResolvedValue(null);
      const result = await getServerSideProps(params)
      mockRouter.push("/pages/p/1")
      render(<Page {...result.props} />)

      expect(result.props.post).toEqual(null)
      const postName = screen.getByTestId('post-name')
      const headingTitle= screen.getByTestId('heading-title')
      expect(postName).toBeInTheDocument()
      expect(headingTitle).toBeInTheDocument()
      expect(postName).toBeEmptyDOMElement()
      expect(headingTitle).toBeEmptyDOMElement()
  })

  it('renders a 404 page when props is not found', async () => {

    global.prisma.post.findUniqueOrThrow.mockRejectedValue(
      new PrismaClientKnownRequestError('NotFoundError [PrismaClientKnownRequestError]: No Post found' ,{
        clientVersion: '5.14.0',
        code: 'P2025',
      })
    )
    const result = await getServerSideProps(params)
    mockRouter.push('/pages/p/1')
    render(<Page {...result.props} />)
    expect(result).toEqual({
      props: {
        name: 'PrismaClientKnownRequestError',
        code: 'P2025',
        clientVersion: '5.14.0',
      },
    });
    const header1 = screen.getByText('404')
    const header2 = screen.getByText('Post does not exist.')
    expect(header1).toBeInTheDocument()
    expect(header2).toBeInTheDocument()
  })
})