/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Debt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Fund` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,source]` on the table `Income` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `SavingsChallenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Debt_userId_name_key" ON "Debt"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Fund_userId_name_key" ON "Fund"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Income_userId_source_key" ON "Income"("userId", "source");

-- CreateIndex
CREATE UNIQUE INDEX "SavingsChallenge_userId_name_key" ON "SavingsChallenge"("userId", "name");
