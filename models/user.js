const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  movimentacoes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movimentacao'
    }
  ],
  categorias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User