import React from "react";
import Router from "next/router";

export type PostProps = {
  id: string
  title: string
  location: string
  ownerId: string
  owner: {
    id: string
    name: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
  attendees: [string]
};

const Post: React.FC<{ post: PostProps } > = ( {post} ) => {
  const postTitle = post.title ? post.title : "Unknown Post";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{postTitle}</h2>
      <small>By {post.owner.name}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
