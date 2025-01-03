-- CreateTable
CREATE TABLE "Enlace" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT DEFAULT 'Sin descripcion',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "votos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Enlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "fechaComentario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enlaceId" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etiqueta" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnlaceEtiqueta" (
    "enlaceId" INTEGER NOT NULL,
    "etiquetaId" INTEGER NOT NULL,

    CONSTRAINT "EnlaceEtiqueta_pkey" PRIMARY KEY ("enlaceId","etiquetaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Etiqueta_nombre_key" ON "Etiqueta"("nombre");

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_enlaceId_fkey" FOREIGN KEY ("enlaceId") REFERENCES "Enlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnlaceEtiqueta" ADD CONSTRAINT "EnlaceEtiqueta_enlaceId_fkey" FOREIGN KEY ("enlaceId") REFERENCES "Enlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnlaceEtiqueta" ADD CONSTRAINT "EnlaceEtiqueta_etiquetaId_fkey" FOREIGN KEY ("etiquetaId") REFERENCES "Etiqueta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
