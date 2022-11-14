import Router from '@koa/router'
import * as TaskControllers from '#components/task/task-controllers.js'

const task = new Router()

task.get('/', TaskControllers.index)

task.post('/', TaskControllers.create)

task.get('/:id', TaskControllers.getById)

task.delete('/:id', TaskControllers.deleteById)

task.put('/:id', TaskControllers.updateById)

export default task