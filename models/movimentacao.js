const { Schema, model } = require('mongoose')

const movimentacaoSchema = new Schema({

  data: Date,
  categoria: { 
    type: Schema.Types.ObjectId, 
    ref: 'Categoria',
    required: true 
  },
  tipo: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    minlength: 5
  },
  user: {    type: Schema.Types.ObjectId,    ref: 'User'  }
})

movimentacaoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.user
  }
})

module.exports = model('Movimentacao', movimentacaoSchema)