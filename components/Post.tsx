import React from "react";
import Router from "next/router";
import { Heading, Text } from "@chakra-ui/react";

export type PostProps = {
  id: string
  title: string
  location: string
  ownerId: string
  description: string
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
  const description = post.description;
  const name = post.owner.name;

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <Heading>{postTitle}</Heading>
      <Text>{description}</Text>
      <Text size="xs">By {name}</Text>
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
