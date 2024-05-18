import React from "react"
import { GetStaticProps } from "next"
import prisma from '../lib/prisma'
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany({
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
    props: { posts },
    revalidate: 10,
  };
};

type Props = {
  posts: PostProps[]
}

const PostPage: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Posts</h1>
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

export default PostPage
