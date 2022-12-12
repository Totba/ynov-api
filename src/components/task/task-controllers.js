import TaskModel from '#components/task/task-model.js'
import { updateTask } from '#components/task/task-user-cases.js'
import Joi from 'Joi'

export async function index (ctx) {
    try {
    const tasks = await TaskModel.find({})
    ctx.ok(tasks)
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function id (ctx) {
    try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const task = await TaskModel.findById(ctx.params.id)
    if(task.createBy.toString() !== ctx.state.user.id) { 
        ctx.body = "Unauthorized" 
        return ctx.status = 401
    }

    ctx.ok(task)
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function getAllByList (ctx) {
    try {
    if(!ctx.params.listId) throw new Error('No id supplied')
    const tasks = await TaskModel.findByListId(ctx.params.listId)
    ctx.ok(tasks)
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}


export async function create (ctx) {
    try {
    const taskValidationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        list: Joi.string().required()
    })
    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)
    var task = ctx.request.body
    task.createBy = ctx.state.user.id
    const newTask = await TaskModel.create(task)
    ctx.ok(newTask)
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function update (ctx) {
    try {
    const taskValidationSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string(),
        list: Joi.string()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const task = await TaskModel.findById(ctx.params.id)
    if(task.createBy.toString() !== ctx.state.user.id) { 
        ctx.body = "Unauthorized" 
        return ctx.status = 401
    }
    
    const updatedTask = await updateTask(ctx.params.id, ctx.request.body)

    ctx.ok(updatedTask)
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}

export async function destroy (ctx) {
    try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const task = await TaskModel.findById(ctx.params.id)
    if(task.createBy.toString() !== ctx.state.user.id) { 
        ctx.body = "Unauthorized" 
        return ctx.status = 401
    }
    await TaskModel.findByIdAndDelete(ctx.params.id)
    ctx.ok('Task deleted')
    } catch (e) {
    ctx.badRequest({ message: e.message })
    }
}