import Comments from '../cotrollers/commentsController.js'
import express from "express"

const comments = new Comments();

const CommentRouter = express.Router()



CommentRouter.post("/",comments.createComment)


CommentRouter.get("/:enlaceId",comments.findByIdComment)



export default CommentRouter;