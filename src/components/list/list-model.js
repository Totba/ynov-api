import mongoose from 'mongoose'

const { Schema } = mongoose

// const taskSchema = new Schema({
//     title: string,
//     required: true
// })

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    child: {
        age:{
            type: Number
        },
        name: String
    }
},
{
    timestamps : true
})

const List = mongoose.model('List', listSchema)

const newList = new List({ title: 'Courses'})

//newList.tasks[0].title = "Acheter des pommes de terre"


//newList.save()

export default List