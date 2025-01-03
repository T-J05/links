import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default class Links{
    constructor(){

    }
    async viewAllLinks(req,res){
        try{
            const links = await prisma.enlace.findMany({
                include: {
                    etiquetas: {
                      include: {
                        etiqueta: true, 
                      },
                    },
                    comentarios: true,
                  },
                });
            
            res.status(200).json({enlaces : links})
        }catch(error){
            res.status(500).json({'error':'error obtener links',error})
            console.error('error al obtener los links',error.message)
        }
    }
    
    async createLink(req, res) {
        const { url, titulo, descripcion, etiquetas } = req.body;
    
        console.log('Etiqueta recibida:', etiquetas);  // Verifica que se reciba el objeto de etiqueta correctamente
    
        try {
            // Verifica que "etiquetas" sea un objeto (no un array en este caso)
            if (!etiquetas || typeof etiquetas !== 'object' || !etiquetas.nombre) {
                return res.status(400).json({ error: 'El campo "etiquetas" debe ser un objeto con un campo "nombre"' });
            }
    
            // Verifica si la etiqueta ya existe o crea una nueva
            const etiqueta = await prisma.etiqueta.upsert({
                where: { nombre: etiquetas.nombre },  // Busca la etiqueta por nombre
                update: {},  // No actualiza nada
                create: { nombre: etiquetas.nombre },  // Crea una nueva etiqueta si no existe
            });
    
            console.log('Etiqueta procesada:', etiqueta);
    
            // Ahora, crea el enlace y lo asocia con la etiqueta a través de EnlaceEtiqueta
            const newLink = await prisma.enlace.create({
                data: {
                    url: url,
                    titulo: titulo,
                    descripcion: descripcion || "Sin descripcion",  // Si no se proporciona descripción, usa "Sin descripcion"
                    etiquetas: {
                        create: {
                            etiquetaId: etiqueta.id,  // Asocia el enlace con la etiqueta
                        },
                    },
                },
            });
    
            console.log('Enlace creado:', newLink);
    
            res.status(200).json({ 'Exito': 'Creación exitosa', newLink });
        } catch (error) {
            console.error('Error al crear el enlace:', error.message);
            res.status(500).json({ error: 'Error al crear enlace', details: error });
        }
    }
    
    
    async getLinksByTag(req, res) {
        const { nombreEtiqueta } = req.params; 
        try {
            const etiqueta = await prisma.etiqueta.findUnique({
                where: {
                    nombre: nombreEtiqueta
                },
                include: {
                    enlaces: {
                        include: {
                            enlace: true // Incluye información completa de los enlaces asociados
                        }
                    }
                }
            });
    
            if (!etiqueta) {
                return res.status(404).json({ error: `No se encontró la etiqueta: ${nombreEtiqueta}` });
            }
    
            // Extrae los enlaces de la etiqueta
            const enlaces = etiqueta.enlaces.map(enlaceEtiqueta => enlaceEtiqueta.enlace);

            console.log({'Obtenido correctamente los enlaces':enlaces})
            res.json(enlaces);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Error al obtener enlaces por etiqueta' });
        }
    }
    


    async SumarVotos(req,res){
        const{ id } = req.params;
        try{
            const votoSum = await prisma.enlace.update({
                where:{
                    id : parseInt(id)
                },
                data: {
                    votos: {
                        increment: 1,
                    },
                },
            });
            res.status(200).json({message:'Voto sumado con exito vamoou', enlace : votoSum})
            console.log({message:'Voto sumado con exito vamoou', enlace : votoSum})
        }catch(error){
            res.status(500).json({'Error al intentar sumar el voto':error.message})
            console.error({error:error.message , message:"Error al sumar el fakin voto"});
        };

    };
};