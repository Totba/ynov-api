import UserModel from '#components/user/user-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'

export async function register (ctx) {
    try {
        const registerValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            terms_and_conditions: Joi.boolean().valid(true).required()
        })
        const params = ctx.request.body
        const  { error, value } = registerValidationSchema.validate(params)
        if(error) throw new Error(error)
        const hashedPassword = await argon2.hash(value.password)
        const newUser = new UserModel({
            ...value,
            password: hashedPassword,
            settings:{
                terms_and_conditions: value.terms_and_conditions
            }
        })
        newUser.generateEmailVerificationToken()
        const user = await newUser.save()
        await sendWelcomeEmail(user, user.settings.validation_email_token)
        const token = user.generateJWT()
        ctx.ok({ token })
    } catch(e) {
        ctx.badRequest({ message: e.message })
    }
}


export async function login (ctx) {
    try {
        const loginValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        const params = ctx.request.body
        const  { error, value } = loginValidationSchema.validate(params)
        if(error) throw new Error(error)
        const user = await UserModel.findOne({email: params.email}, {email: 1, password: 1})
        if(!user) { return ctx.notFound() }
        if(await argon2.verify(user.password, params.password)) {    
            const token = user.generateJWT()
            ctx.ok({ token })
        }
        else {
            ctx.status = 401
            ctx.body = "Pas le bon password"
        }
    } catch(e) {
        ctx.badRequest({ message: e.message })
    }
}

export async function update (ctx) {
    try {
        let idUser = ctx.state.user._id

        const loginValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
        let json = ctx.request.body
        const  { error, value } = loginValidationSchema.validate(json)
        if(error) throw new Error(error)
        if(!await UserModel.findOne({email: json.email}, {email: 1})) {
            json.updateAt = Date.now()
            await UserModel.findOneAndUpdate(idUser, json)
            ctx.status = 200
            ctx.body = "User update"
        } else {
            ctx.status = 400
            ctx.body = "Un user a déjà cet email"
        }
        
    } catch(e) {
        ctx.badRequest({ message: e.message })
    }
}