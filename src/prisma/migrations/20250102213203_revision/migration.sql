/*
  Warnings:

  - Made the column `descripcion` on table `Enlace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Enlace" ALTER COLUMN "descripcion" SET NOT NULL;
