/*
  Warnings:

  - You are about to drop the column `pixelNumber` on the `user` table. All the data in the column will be lost.
  - Added the required column `pixelCount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pixelNumber`,
    ADD COLUMN `pixelCount` INTEGER NOT NULL;
