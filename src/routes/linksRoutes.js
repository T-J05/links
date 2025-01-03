import Links from '../cotrollers/linksController.js'
import express, { Router } from "express"

const links = new Links();

const linkRouter = express.Router()


linkRouter.get('/', links.viewAllLinks)


linkRouter.get('/:nombreEtiqueta',links.getLinksByTag)


linkRouter.post('/',links.createLink)


linkRouter.patch("/:id",links.SumarVotos)


export default linkRouter;