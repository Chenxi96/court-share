import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Page from '@/components/CreateFormPost'
import { useSession } from 'next-auth/react';

const form = {
    title: 'example',
    latitude: 0,
    longitude: 0,
    ownerId: 'example',
    description: 'example',
    availableSpots: 3,
    email: 'example',
    name: 'example',
    eventTime: 'example'
  }

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(form),
    }),
  );

describe('Testing if you have access to creatForm component', () => {
    const oneDay = 86400
    const userSession = {
        user: {
            name: 'admin',
            email: 'example@example.com',
            image: 'example'
        },
        expires: new Date(Date.now() + oneDay).toISOString()
    }
    
    const props = {
        session: {
            user: {
                name: 'admin',
                email: 'example@example.com',
                image: 'example'
            },
        },
        name: {
            name: 'admin',
            id: 'example'
        }
    }
    it('Show form when logged in', () => {
        useSession.mockReturnValue({
            data: userSession,
            status: 'authenticated'
        })
        render(<Page {...props}/>)
        const title = screen.getByLabelText('Title')
        const location = screen.getByLabelText('Location')
        expect(title).toBeInTheDocument()
        expect(location).toBeInTheDocument()
        expect(global.fetch).not.toHaveBeenCalled()
    })

    it('Do not show form when not logged in', () => {
        const user = null
        useSession.mockReturnValue({
            data: user
        })
        render(<Page {...props}/>)
        const noForm = screen.getByText('Please log in to create post')
        expect(noForm).toBeInTheDocument()
        expect(global.fetch).not.toHaveBeenCalled()
    })

    it('Check that form has been submitted', async () => {
        useSession.mockReturnValue({
            data: userSession,
            status: 'authenticated'
        })
        render(<Page {...props} />)
        const button = screen.getByRole('button', {name: 'Submit'})
        fireEvent.click(button)
        const text = screen.getByText('Post created')
        expect(text).toHaveTextContent('Post created')
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })
})