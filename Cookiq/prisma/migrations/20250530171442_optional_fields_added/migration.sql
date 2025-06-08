/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "subscription" DROP NOT NULL,
ALTER COLUMN "credits" DROP NOT NULL;
