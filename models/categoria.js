const { Schema, model } = require('mongoose')


const categoriaSchema = new Schema({
  name: {
    type: String, 
    minlength: 5,
    required: true
  },
  user: {    type: Schema.Types.ObjectId,    ref: 'User'  }
})

categoriaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  }
})

module.exports = model('Categoria', categoriaSchema)