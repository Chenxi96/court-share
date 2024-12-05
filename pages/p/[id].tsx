import React from "react"
import { GetServerSideProps } from "next"
import prisma from '@/lib/prisma';
import Layout from "@/components/Layout"
import { PostProps } from "@/components/Post"
import Error from 'next/error'
import { auth } from '@/lib/authSession'
import { Session } from 'next-auth'
import { Heading, Text } from "@chakra-ui/react";

interface PropObj {
  post: PostProps
  session: Session
  name: string,
  code: string,
  clientVersion: string
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = await auth(context)
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: String(context.params?.id),
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
        description: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return {
      props: {
        post,
        session: JSON.parse(JSON.stringify(session))
      },
    };

  } catch(error) {
    return {
      props: JSON.parse(JSON.stringify(error))
    }
  }
 
};

const Post: React.FC<PropObj> = (props) => {
    let title = props?.post?.title
    let name = props?.post?.owner?.name
    let description = props?.post?.description
    
    if(props?.code) {
      return <Error statusCode={404} title="Post does not exist"/>
    } else if(!props?.session?.user) {
      return (
        <Layout>
          <p>need to login</p>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div>
        <Heading data-testid="heading-title">{title}</Heading>
        <Text data-testid="post-description">{description}</Text>
        <Text data-testid="post-name">{name}</Text>
        <style jsx>{`
      .page {
        background: white;
        padding: 2rem;
        }
        
        .actions {
          margin-top: 2rem;
          }
          
          button {
            background: #ececec;
            border: 0;
            border-radius: 0.125rem;
            padding: 1rem 2rem;
            }
            
            button + button {
              margin-left: 1rem;
              }
              `}</style>
      </div>
        </Layout>
      )
    }

}

export default Post
