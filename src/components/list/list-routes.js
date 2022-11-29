import Router from '@koa/router'
import * as ListControllers from '#components/list/list-controllers.js'

const list = new Router()

list.get('/', ListControllers.index)

list.post('/', ListControllers.create)

list.get('/:id', ListControllers.getById)

list.delete('/:id', ListControllers.deleteById)

list.put('/:id', ListControllers.updateById)

export default list