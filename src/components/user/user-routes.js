import Router from '@koa/router'
import * as UserControllers from '#components/user/user-controller.js'
import { isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'

const users =  new Router()

users.post('/register', UserControllers.register)

users.post('/login', UserControllers.login)

users.get('/me', isAuthenticatedWithUser, (ctx) => {
    ctx.ok({
        user: ctx.state.user
    })
})

users.post('/update', isAuthenticatedWithUser, UserControllers.update)


export default users