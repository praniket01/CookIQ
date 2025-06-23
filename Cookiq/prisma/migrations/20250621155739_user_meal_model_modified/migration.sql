-- DropIndex
DROP INDEX "UserMeal_email_key";

-- AlterTable
ALTER TABLE "UserMeal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
