import Router from '@koa/router'
import * as ListControllers from '#components/list/list-controllers.js'
import { isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'

const list = new Router()

list.get('/', isAuthenticatedWithUser, ListControllers.index)

list.post('/', isAuthenticatedWithUser, ListControllers.create)

list.get('/:id', isAuthenticatedWithUser, ListControllers.getById)

list.delete('/:id', isAuthenticatedWithUser, ListControllers.deleteById)

list.put('/:id', isAuthenticatedWithUser, ListControllers.updateById)

export default list