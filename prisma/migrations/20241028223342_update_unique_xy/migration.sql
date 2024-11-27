/*
  Warnings:

  - You are about to drop the column `canvasId` on the `pixel` table. All the data in the column will be lost.
  - You are about to drop the `canvas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[x,y]` on the table `Pixel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Pixel` DROP FOREIGN KEY `Pixel_canvasId_fkey`;

-- AlterTable
ALTER TABLE `Pixel` DROP COLUMN `canvasId`;

-- DropTable
DROP TABLE `Canvas`;

-- CreateIndex
CREATE UNIQUE INDEX `Pixel_x_y_key` ON `Pixel`(`x`, `y`);
