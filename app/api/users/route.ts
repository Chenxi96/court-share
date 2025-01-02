import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
 try {
  let cursor = req.nextUrl.searchParams.get("lastCursor")
  
  const firstQueryResults = await prisma.post.findMany({
    take: 2,
    ...(cursor && {
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor as string,
      }
       }),
    orderBy: {
      id: 'asc'
    }
  }
);

  if (firstQueryResults.length == 0) {
    return NextResponse.json({
   data: [],
   metaData: {
     lastCursor: null,
     hasNextPage: false,
   }},
    { status: 200 })
  };

  const firstQuery: any = firstQueryResults[firstQueryResults.length - 1];
  cursor = firstQuery.id;

  const nextPage = await prisma.post.findMany({
    take: 2,
    skip: 1,
    cursor: {   
      id: cursor as string,
    },
    orderBy: {
      id: 'asc'
    }
  });

  const previousPage = await prisma.post.findMany({
    take: -2,
    cursor: {
      id: cursor as string,
    },
    orderBy: {
      id: 'asc'
    }
  })


  const data = {
    data: firstQueryResults, metaData: {
   lastCursor: cursor,
   hasNextPage: nextPage.length > 0
    }
  };

  return NextResponse.json(data, {status: 200});
   } catch (error: any) {
  return NextResponse.json({error: error.message}, {status: 403});
   }
}