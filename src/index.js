import express from 'express'
import TagsRouter from './routes/tagsRoutes.js';
import linkRouter from './routes/linksRoutes.js';
import CommentRouter from './routes/commentsRoutes.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3002
app.use(cors()); 
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5500',"http://localhost:4200","http://localhost:5173"];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Permite la solicitud
    } else {
      callback(new Error('No permitido por CORS')); // Bloquea la solicitud
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']// Asegúrate de permitir PATCH si es necesario
  // Si usas headers personalizados, añádelos aquí
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/api/tag',TagsRouter)

app.use('/api/link',linkRouter)

app.use('/api/comment',CommentRouter)



console.log(port)

app.listen(port, () => {
    console.log("Servidor Corriendo...")
})