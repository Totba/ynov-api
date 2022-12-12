import mongoose from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    list:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'List'
    },
    createBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{ 
    timestamps: true
})


const Task = mongoose.model('Task', taskSchema)

//const newTask = Task.create({ title:'Task 1', lsit: '2435353Z53531R3TE'})


export default Task