import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";
import mockRouter from 'next-router-mock';
import Page from '../../../pages/p/[id].tsx';
import { getServerSideProps } from "../../../pages/p/[id].tsx"

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
  
    global.prisma.post.findUnique.mockResolvedValue(post)
    const result = await getServerSideProps(params)
    mockRouter.push("/pages/p/1")
    render(<Page {...result.props} />)
    
    const headingTitle= screen.getByTestId('heading-title')
    expect(headingTitle).toBeInTheDocument()
    expect(headingTitle).toHaveTextContent(result.props.title)
  })


  it('render owner name', async() => {
  
    global.prisma.post.findUnique.mockResolvedValue(post)
    const result = await getServerSideProps(params)
    mockRouter.push("/pages/p/1")
    render(<Page {...result.props} />)
    
    const postName = screen.getByTestId('post-name')
    expect(postName).toBeInTheDocument()
    expect(postName).toHaveTextContent(result.props.owner.name)
  })

  it('renders page when props is null', async () => {
      global.prisma.post.findUnique.mockResolvedValue(null);
      const result = await getServerSideProps(params)
      mockRouter.push("/pages/p/1")
      render(<Page {...result.props} />)

      expect(result.props).toEqual(null)
      const postName = screen.getByTestId('post-name')
      const headingTitle= screen.getByTestId('heading-title')
      expect(postName).toBeInTheDocument()
      expect(headingTitle).toBeInTheDocument()
      expect(postName).toBeEmptyDOMElement()
      expect(headingTitle).toBeEmptyDOMElement()
  })
})