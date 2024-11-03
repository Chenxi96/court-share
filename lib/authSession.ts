import { auth as useAuthSession } from '@/auth'

export const auth = async (requestOrContext) => {
    if(process.env.NEXT_PUBLIC_USE_TEST === 'true') {
        const date = new Date()
        return ({
            user: {
                name: 'admin',
                email: 'testing@example.com',
                image: null
            },
            expires: JSON.parse(JSON.stringify(new Date(date.setMonth(date.getMonth() + 1))))
        })
    } else {
        return await useAuthSession(requestOrContext)
    }
}
