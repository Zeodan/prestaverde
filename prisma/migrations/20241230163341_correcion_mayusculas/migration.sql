/*
  Warnings:

  - You are about to drop the column `unidad_Venta` on the `Producto` table. All the data in the column will be lost.
  - You are about to alter the column `precio_palet` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `unidad_venta` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Producto` DROP COLUMN `unidad_Venta`,
    ADD COLUMN `unidad_venta` ENUM('kilo', 'bulto', 'pieza') NOT NULL,
    MODIFY `precio_palet` DOUBLE NOT NULL;
