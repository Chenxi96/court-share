/*
  Warnings:

  - Added the required column `eventTime` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "posts_ownerId_key";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "eventTime" TIMESTAMP(3) NOT NULL;
