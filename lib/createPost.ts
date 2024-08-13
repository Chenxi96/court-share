import { PrismaClient } from "@prisma/client";

type MyPoint = {
    latitude: number,
    longitude: number
}

type MyPointOfInterest = {
    location: MyPoint
}

export const prisma = new PrismaClient().$extends({
    model: {
      post: {
        async createPost(data: {
            title: string
            latitude: number
            longitude: number
            ownerId: string
            description: string
            availableSpots: number
            email: string
            name: string
        }) {
        
        const createPost = await prisma.post.create({
            data: {
                title: data.title,
                description: data.description, 
                availableSpots: data.availableSpots,
                owner: {
                    connectOrCreate: {
                        where: {
                            id: data.ownerId
                        },
                        create: {
                            name: data.name,
                            email: data.email
                        }
                    }
                }
            }
        })
          // Create an object using the custom types from above
          const poi: MyPointOfInterest = {
            location: {
              latitude: data.latitude,
              longitude: data.longitude,
            }
          }
  
        //   // Insert the object into the database
          const point = `POINT(${poi.location.longitude} ${poi.location.latitude})`
          await prisma.$queryRaw`
            UPDATE "posts" 
            SET location = ST_GeomFromText(${point}, 4326)
            WHERE id = ${createPost.id};
          `

          // Return the object
          return poi
        },
      },
    },
  })