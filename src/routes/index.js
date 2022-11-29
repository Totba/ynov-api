import Router from '@koa/router'
//import exempleRoutes from '#components/exemple/exemple-routes.js'
import taskRoutes from '#components/task/task-routes.js'
import listRoutes from '#components/list/list-routes.js'
import userRoutes from '#components/user/user-routes.js'


// const API_V1_ROUTER = new Router({ prefix: '/api/v1' })
// API_V1_ROUTER.use('/exemples', exempleRoutes.routes(), exempleRoutes.allowedMethods())

// export { API_V1_ROUTER }

const API_V1_ROUTER = new Router({ prefix: '/api/v1' })
API_V1_ROUTER.use('/task', taskRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use('/list', listRoutes.routes(), taskRoutes.allowedMethods())
API_V1_ROUTER.use('/users', userRoutes.routes(), userRoutes.allowedMethods())

export { API_V1_ROUTER }