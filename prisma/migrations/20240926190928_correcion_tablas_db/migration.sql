/*
  Warnings:

  - You are about to alter the column `unidad_Venta` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `precio_transporte` INTEGER NULL;

-- AlterTable
ALTER TABLE `Producto` ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `precio_palet` INTEGER NULL,
    MODIFY `unidad_Venta` ENUM('Kilo', 'Bulto', 'Pieza') NOT NULL;
