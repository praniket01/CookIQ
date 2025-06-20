-- CreateTable
CREATE TABLE "UserMeal" (
    "email" TEXT NOT NULL,
    "recepies" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMeal_email_key" ON "UserMeal"("email");
