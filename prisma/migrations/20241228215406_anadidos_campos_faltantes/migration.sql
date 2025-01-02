/*
  Warnings:

  - You are about to drop the column `Created` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `Contenido` on the `Mensaje` table. All the data in the column will be lost.
  - You are about to drop the column `Prenombre` on the `Mensaje` table. All the data in the column will be lost.
  - Added the required column `contenido` to the `Mensaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenombre` to the `Mensaje` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `Created`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Mensaje` DROP COLUMN `Contenido`,
    DROP COLUMN `Prenombre`,
    ADD COLUMN `contenido` VARCHAR(191) NOT NULL,
    ADD COLUMN `prenombre` VARCHAR(191) NOT NULL;
