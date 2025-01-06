import express from 'express'
import TagsRouter from './routes/tagsRoutes.js';
import linkRouter from './routes/linksRoutes.js';
import CommentRouter from './routes/commentsRoutes.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3002
app.use(cors()); 
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/api/tag',TagsRouter)

app.use('/api/link',linkRouter)

app.use('/api/comment',CommentRouter)



console.log(port)

app.listen(port, () => {
    console.log("Servidor Corriendo...")
})