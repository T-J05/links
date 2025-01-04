import express from 'express'
import TagsRouter from './routes/tagsRoutes.js';
import linkRouter from './routes/linksRoutes.js';
import CommentRouter from './routes/commentsRoutes.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/api/tag',TagsRouter)

app.use('/api/link',linkRouter)

app.use('/api/comment',CommentRouter)



console.log(port)

app.listen(port, () => {
    console.log("Servidor Corriendo...")
})