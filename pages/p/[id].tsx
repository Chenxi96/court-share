import React from "react"
import { GetServerSideProps } from "next"
import prisma from '../../lib/prisma';
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
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
};
const Post: React.FC<PostProps> = (props) => {
  let title = props?.title
  let name = props?.owner?.name
  
  return (
    <Layout>
      <div>
        <h2 data-testid="heading-title">{title}</h2>
        <p data-testid="post-name">{name}</p>
      </div>
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
    </Layout>
  )
}

export default Post
