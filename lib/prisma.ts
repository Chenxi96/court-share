import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended'

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else if (process.env.NODE_ENV == 'test') {
  global.prisma = mockDeep<PrismaClient>();
  prisma = global.prisma;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;