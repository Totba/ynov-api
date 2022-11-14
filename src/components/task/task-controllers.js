import Task from "#components/task/task-model.js";
import Joi from 'joi'


export async function index (ctx) {
    try {
        ctx.body = await Task.find({})
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}


export async function create (ctx) {
    try {
        const taskValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string()
        })
        // https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
        // const objTest = { name: 'test', value: 123, nested: { color: 'black' }}
        // const arrTest = ['value1', 'value2']
        // const { name, nested: { color } } = objTest
        // const [val1] = arrTest


        const { error } = taskValidationSchema.validate(ctx.request.body)

        if(error) {
            throw new Error(error)
        } else {
            Task.create(ctx.request.body)
            ctx.status = 200
            ctx.body = "Task Add"
        }

    } catch (e) {
        ctx.badRequest({ message: e.message})
    }
}


export async function getById (ctx) {
    try {
        ctx.body = await Task.findById(ctx.params.id)
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}

export async function deleteById (ctx) {
    try {
        await Task.findOneAndRemove(ctx.params.id)
        ctx.status = 200
        ctx.body = "Task delete"
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}


export async function updateById (ctx) {
    try {
        console.log(ctx.params.id)
        let json = ctx.request.body
        json.updateAt = Date.now()

        await Task.findOneAndUpdate(ctx.params.id, json)
        ctx.status = 200
        ctx.body = "Task upsdate"
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}
