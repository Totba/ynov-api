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
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    createBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{ 
    timestamps: true
})

taskSchema.static({
    async findByListId(listId) {
        return this.find({list: listId});
    }
});


const Task = mongoose.model('Task', taskSchema)

//const newTask = Task.create({ title:'Task 1', lsit: '2435353Z53531R3TE'})


export default Task