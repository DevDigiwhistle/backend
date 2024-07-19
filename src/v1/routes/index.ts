import authRouter from './auth.routes'
import contactUsRouter from './contactUs.routes'
import { Router } from 'express'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from '../../config/docs'
import roleRouter from './role.routes'
import brandRouter from './brand.routes'
import influencerRouter from './influencer.routes'
import adminRouter from './admin.routes'
import employeeRouter from './employee.routes'
import { verifyToken } from '../middleware'

const apiRouter = Router()

apiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
apiRouter.use('/auth', authRouter)
apiRouter.use('/contactUs', contactUsRouter)
apiRouter.use('/role', roleRouter)
apiRouter.use('/brand', brandRouter)
apiRouter.use('/influencer', influencerRouter)
apiRouter.use('/admin', adminRouter)
apiRouter.use('/employee', employeeRouter)

export default apiRouter
