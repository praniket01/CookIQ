/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserMeal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserMeal_email_key" ON "UserMeal"("email");
