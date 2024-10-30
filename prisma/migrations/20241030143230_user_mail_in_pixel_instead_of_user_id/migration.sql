/*
  Warnings:

  - You are about to drop the column `userId` on the `pixel` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Pixel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pixel` DROP FOREIGN KEY `Pixel_userId_fkey`;

-- AlterTable
ALTER TABLE `pixel` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pixel` ADD CONSTRAINT `Pixel_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
