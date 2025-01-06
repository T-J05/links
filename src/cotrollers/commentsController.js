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
                    enlaceId :parseInt(enlaceId),
                    usuarioId : parseInt(userId) || null
                }
            });

            res.status(200).json({success:"oikoite",comentario:newComment})
            console.log("Comentario creado exitosamente",newComment)

        }catch(error){
            res.status(500).json(error, 'Error al crear comentario')
            console.error('error al crear comnetario', error.message)
        };
    };


    async findByIdComment(req,res){
        const { enlaceId } = req.params;

        if (!enlaceId) {
            return res.status(400).json({ error: 'El parámetro enlaceId es obligatorio' });
        }

        try{
            const Comments = await prisma.comentario.findMany({
             where:{
                enlaceId : parseInt(enlaceId)
             }
            });

            res.status(200).json({comentarios:Comments})
            console.log("Comentarios encontrados exitosamente",Comments)

        }catch(error){
            res.status(500).json(error, 'Error al obtener los comentarios')
            console.error('error al obtener los comnetarios', error.message)
        };
    };
};