/*
  Warnings:

  - Added the required column `icon` to the `Fund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "icon" TEXT NOT NULL;
