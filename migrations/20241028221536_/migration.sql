/*
  Warnings:

  - You are about to drop the column `canvasId` on the `pixel` table. All the data in the column will be lost.
  - You are about to drop the `canvas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pixel` DROP FOREIGN KEY `Pixel_canvasId_fkey`;

-- DropIndex
DROP INDEX `Pixel_x_y_canvasId_key` ON `pixel`;

-- AlterTable
ALTER TABLE `pixel` DROP COLUMN `canvasId`;

-- DropTable
DROP TABLE `canvas`;
