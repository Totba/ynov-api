import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Task = mongoose.model('Task', taskSchema)



export default Task