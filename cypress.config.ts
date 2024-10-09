import { defineConfig } from "cypress";
import prisma from './lib/prisma'
require('dotenv').config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here'
      on('task', {
        async mockUser() {
          const user = await prisma.user.findUnique({
            where: {
              email: 'testing@example.com'
            }
          })
          if (!user) {
            return await prisma.user.create({
              data: {
                  name: 'admin',
                  email: 'testing@example.com',
                  image: null
              }
            })
          }
          return null
        },
        async deleteUser() {
          await prisma.post.deleteMany({})
          return null
        },
        async deletePost() {
          await prisma.user.deleteMany({})
          return null
        }
      })
    },
  },
});
