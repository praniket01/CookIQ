-- DropIndex
DROP INDEX "UserMeal_email_key";

-- AlterTable
ALTER TABLE "UserMeal" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserMeal_pkey" PRIMARY KEY ("id");
