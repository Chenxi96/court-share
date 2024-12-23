import React from "react"
import { GetServerSideProps } from "next"
import prisma from '@/lib/prisma'
import Layout from "@/components/Layout"
import Post, { PostProps } from "@/components/Post"
import { auth } from '@/lib/authSession'
import { Session } from "next-auth"
import { Heading } from "@chakra-ui/react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context)
  
  const posts = await prisma.post.findMany({
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
    props: { posts, session},
  };
};

type Props = {
  posts: PostProps[]
  session: Session
}

const PostPage: React.FC<Props> = (props) => {
  if(!props?.session) {
    return (
      <Layout>
        <p>Please log in</p>
      </Layout>
    )
  } else { 
    return (
      <Layout>
        <div className="page">
          <Heading as='h1' size='4xl'>Public Posts</Heading>
          <main>
            {props.posts.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </main>
        </div>
        <style jsx>{`
          .post {
            background: white;
            transition: box-shadow 0.1s ease-in;
          }
  
          .post:hover {
            box-shadow: 1px 1px 3px #aaa;
          }
  
          .post + .post {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    )
  }
}

export default PostPage
