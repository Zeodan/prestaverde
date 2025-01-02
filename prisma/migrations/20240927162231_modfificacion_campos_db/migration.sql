/*
  Warnings:

  - Made the column `precio_transporte` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precio` on table `Producto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `precio_palet` on table `Producto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Cliente` MODIFY `precio_transporte` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Producto` MODIFY `precio` DOUBLE NOT NULL,
    MODIFY `precio_palet` INTEGER NOT NULL;
