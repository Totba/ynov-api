import List from "#components/list/list-model.js";
import Joi from 'joi'


export async function index (ctx) {
    try {
        ctx.body = await List.find({})
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}


export async function create (ctx) {
    try {
        const listValidationSchema = Joi.object({
            title: Joi.string().required()
        })
        // https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
        // const objTest = { name: 'test', value: 123, nested: { color: 'black' }}
        // const arrTest = ['value1', 'value2']
        // const { name, nested: { color } } = objTest
        // const [val1] = arrTest


        const { error } = listValidationSchema.validate(ctx.request.body)

        if(error) {
            throw new Error(error)
        } else {
            List.create(ctx.request.body)
            ctx.status = 200
            ctx.body = "List Add"
        }

    } catch (e) {
        ctx.badRequest({ message: e.message})
    }
}


export async function getById (ctx) {
    try {
        ctx.body = await List.findById(ctx.params.id)
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}

export async function deleteById (ctx) {
    try {
        await List.findOneAndRemove(ctx.params.id)
        ctx.status = 200
        ctx.body = "List delete"
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}


export async function updateById (ctx) {
    try {
        console.log(ctx.params.id)
        let json = ctx.request.body
        json.updateAt = Date.now()

        await List.findOneAndUpdate(ctx.params.id, json)
        ctx.status = 200
        ctx.body = "List upsdate"
    } catch (e) {
        ctx.badResquest({ message: e.message})
    }
}
