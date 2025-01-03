import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export default class Tags{
    constructor(){

    }

    async createTags(req,res){
        const { nombre } = req.body;
        if (nombre.length < 2){
            return res.status(404).json('Error la etiqueta debe de contener al menos dos letras')
        }
        try{
            const newTags = await prisma.etiqueta.create({
                data: {
                    nombre : nombre
                }
            })
            res.status(201).json({'Nueva etiqueta creada correctamente':newTags})
            console.log('Nueva etiqueta creada correctamente',newTags)

        }catch (error) {
                if (error.code === 'P2002') { 
                    res.status(400).json({ error: "La etiqueta ya existe." });
                }
                else {
                    res.status(500).json({ error: "Ocurrió un error inesperado.",error:error });
                    console.error(error.message, 'error al crear la etiqueta chaval')
                };
            };
           
        };


    async getAllTags(req,res){
        try{
            const allTags = await prisma.etiqueta.findMany()
            res.json({etiquetas : allTags})
            console.log({'todas las etiquetas' : allTags})
        }catch(error){
            res.status(500).json({'ERROR al obtener las etiquetas':error.message})
            console.error({'error al obtener las etiquetas':error.message,details: error})
        }
    }

    };
    
