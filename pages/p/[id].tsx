import React from "react"
import { GetServerSideProps } from "next"
import prisma from '../../lib/prisma';
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import Error from 'next/error'

interface prismaError {
  name: string,
  code: string,
  clientVersion: string
}

export const getServerSideProps: GetServerSideProps = async ({ params, res}) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: String(params?.id),
      },
      select: {
        id: true,
        title: true,
        ownerId: true,
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
      props: post,
    };

  } catch(error) {
    return {
      props: JSON.parse(JSON.stringify(error))
    }
  }
 
};

const Post: React.FC<PostProps & prismaError> = (props) => {
  let title = props?.title
  let name = props.code ? props.name : props?.owner?.name
  return (
    <Layout>
      {props?.code ? <Error statusCode={404} title="Post does not exist"/> : 
        <div>
          <h2 data-testid="heading-title">{title}</h2>
          <p data-testid="post-name">{name}</p>
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
      }
    </Layout>
  )
}

export default Post
