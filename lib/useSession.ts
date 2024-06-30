import { useSession as useNextAuthSession } from "next-auth/react";

export const useSession = () => {
    if(process.env.NEXT_PUBLIC_USE_TEST === 'true') {
        return ({
            data: {
                user: {
                    name: 'admin',
                    email: 'testing@example.com',
                    image: null
                },
                
            },
            status: 'authenticated'
        })
    } else {
        return useNextAuthSession();
    }
}