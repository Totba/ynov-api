import Router from '@koa/router'
import * as ExempleControllers from '#components/exemple/exemple-controllers.js'

const exemples = new Router()

exemples.get('/', ExempleControllers.index)

exemples.get('/:id', (ctx) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    ctx.body = task
})

exemples.post('/', ExempleControllers.create)

exemples.put('/:id', (ctx) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    task.title = 'Modifié'
    ctx.body = todos
})

exemples.delete('/:id', (ctx) => {
    const updateTodos = todos.filter(t => parseInt(ctx.params.id) !== t.id)
    ctx.body = updateTodos
})

export default exemples