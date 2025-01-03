import Tags from '../cotrollers/tagsControllers.js'
import express from "express"

const tags = new Tags();

const TagsRouter = express.Router()


TagsRouter.post("/",tags.createTags)

TagsRouter.get("/",tags.getAllTags)

export default TagsRouter;