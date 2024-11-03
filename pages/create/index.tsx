import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import prisma from "@/lib/prisma";
import React from "react";
import CreateFormPost, { props } from "@/components/CreateFormPost";
import { auth } from '@/lib/authSession'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await auth(context)
    const email = session?.user?.email
    
    if (!email || typeof email !== 'string') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    
    const name =  await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        },
        select: {
            name: true,
            id: true
        }
    })
    
    return {
        props: {
            session: JSON.parse(JSON.stringify(session)),
            name
        }
    }
    
};

const CreatePostForm: React.FC<props> = (props) => {
    return (
        <Layout>
            <CreateFormPost {...props} />
        </Layout>
    )
}

export default CreatePostForm;