import Router from '@koa/router'

const exemples = new Router()


const todos = [
    {
        id: 1,
        title: 'Acheter des patates'
    },
    {
        id: 2,
        title: 'Acheter des poires'
    },
    {
        id: 3,
        title: 'Acheter des pommes'
    }
]
exemples.get('/', (ctx, next) => {
    ctx.body = todos
})

exemples.get('/:id', (ctx) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    ctx.body = task
})

exemples.post('', (ctx) => {
    const newTask = {
        id: todos.length + 1,
        title: ctx.request.body.title
    }
    todos.push(newTask)
    console.log(todos)
    ctx.status = 200
})

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