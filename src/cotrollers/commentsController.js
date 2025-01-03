import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export default class Comments {

    constructor(){

    }

    async createComment(req,res){
        const { contenido , enlaceId, userId} = req.body;
        try{
            const newComment = await prisma.comentario.create({
                data: {
                    contenido : contenido,
                    enlaceId : enlaceId,
                    usuarioId : userId || null
                }
            });

            res.status(200).json({'Nuevo comentario':newComment})
            console.log("Comentario creado exitosamente",newComment)

        }catch(error){
            res.status(500).json(error, 'Error al crear comentario')
            console.error('error al crear comnetario', error.message)
        };
    };
};