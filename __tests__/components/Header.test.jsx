import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/components/Header'
import { useSession } from 'next-auth/react';

jest.mock('next/dist/client/router', () => jest.requireActual('next-router-mock'))

describe('Testing login authentication', () => {
    it('Test if Login is Authenticated', () => {
        const oneDay = 86400
        const user = {
            user: {
                name: 'admin',
                email: 'example@example.com',
                image: 'example'
            },
            expires: new Date(Date.now() + oneDay).toISOString()
        }
        useSession.mockReturnValue({
            data: user,
            status: 'authenticated'
        })
        render(<Page />)
        const text = screen.getByTestId('user')
        const signOut = screen.getByText('Log out')
        expect(text).toHaveTextContent('admin (example@example.com)')
        expect(signOut).toBeInTheDocument();
    })
    it('Test if Login is not Authenticated', () => {
        const user = null
        useSession.mockReturnValue({
            data: user,
            status: 'unauthenticated'
        })
        render(<Page />)
        const signIn = screen.getByText('Log in')
        expect(signIn).toBeInTheDocument()
    })
})

describe('Testing Local development', () => {
  
    it('Testing bypassed auth login', () => {
      process.env.NEXT_PUBLIC_USE_TEST = 'false'
      const oneDay = 86400
        const user = {
            user: {
                name: 'admin',
                email: 'example@example.com',
                image: 'example'
            },
            expires: new Date(Date.now() + oneDay).toISOString()
        }
        useSession.mockReturnValue({
            data: user,
            status: 'authenticated'
        })
        render(<Page />)
        const text = screen.getByTestId('user')
        const signOut = screen.getByText('Log out')
        expect(text).toHaveTextContent('admin (example@example.com)')
        expect(signOut).toBeInTheDocument();  
    })

    it('Testing with local development', () => {
        process.env.NEXT_PUBLIC_USE_TEST = 'true'
        render(<Page />)
        const text = screen.getByTestId('user')
        const signOut = screen.getByText('Log out')
        expect(text).toHaveTextContent('admin (testing@example.com)')
        expect(signOut).toBeInTheDocument(); 
    })
  })