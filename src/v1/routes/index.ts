import authRouter from "./auth.routes";
import contactUsRouter from "./contactUs.routes";
import { Router } from "express";
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "../../config/docs";

const apiRouter=Router()

apiRouter.use('/auth',authRouter)
apiRouter.use('/contactUs',contactUsRouter)
apiRouter.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))

export default apiRouter