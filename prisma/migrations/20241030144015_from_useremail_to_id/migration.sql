/*
  Warnings:

  - You are about to drop the column `userEmail` on the `pixel` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Pixel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pixel` DROP FOREIGN KEY `Pixel_userEmail_fkey`;

-- AlterTable
ALTER TABLE `pixel` DROP COLUMN `userEmail`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Pixel` ADD CONSTRAINT `Pixel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
