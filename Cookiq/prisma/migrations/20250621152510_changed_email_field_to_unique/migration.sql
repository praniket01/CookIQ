/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserMeal` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `recepies` on the `UserMeal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserMeal" DROP COLUMN "recepies",
ADD COLUMN     "recepies" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserMeal_email_key" ON "UserMeal"("email");
