import mongoose from 'mongoose'

const { Schema } = mongoose

const exempleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    color: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Exemple = mongoose.model('Exemple', exempleSchema)

// Exemple.create({
//     name: 'Test product',
//     description: 'Test description',
//     color: ['black', 'red', 'white'],
//     price: 1000
// })

const findAll = async () => {
    const exemples = await Exemple.find({})
    console.log('Find all ====================',exemples);
}


const findById = async () => {
    const exemple = await Exemple.findById('63721a71f13503e36aabce1c')
    console.log('Find By Id ====================',exemple);
}


const updateById = async () => {
    // Méthode 1
    //const exemple = await Exemple.findById('63721a71f13503e36aabce1c', { name: "Premier élément"})

    // Méthode 2 
    const exemple = await Exemple.findById('63721a71f13503e36aabce1c')
    exemple.name = "Modification"
    exemple.save()

    // Méthode 3
    //const exemple = await Exemple.findById('63721a71f13503e36aabce1c')
    //exemple.set({
        //name: "Modifié avec le set"
    //})
    //exemple.save()

    console.log('MAj ====================',exemple);
}

const deleteById = async () => {
    const exemple = Exemple.findById('63721a71f13503e36aabce1c')
}

findAll()
//updateById()
findById()
deleteById()


export default Exemple