import Router from '@koa/router'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

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
router.get('/todos', (ctx, next) => {
    ctx.body = todos
})

router.get('/todos/:id', (ctx) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    ctx.body = task
})

router.post('/todos', (ctx) => {
    const newTask = {
        id: todos.length + 1,
        title: ctx.request.body.title
    }
    todos.push(newTask)
    console.log(todos)
    ctx.status = 200
})

router.put('/todos/:id', (ctx) => {
    const task = todos.find(t => parseInt(ctx.params.id) === t.id)
    task.title = 'Modifié'
    ctx.body = todos
})

router.delete('/todos/:id', (ctx) => {
    const updateTodos = todos.filter(t => parseInt(ctx.params.id) !== t.id)
    ctx.body = updateTodos
})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

app.listen(process.env.PORT, () => console.log(`server listening to port : ${process.env.PORT}`))
