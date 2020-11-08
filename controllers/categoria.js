const categoriasRota = require('express').Router()
const Categoria = require('../models/categoria')
const User = require('../models/user')
const authMiddleware = require('../utils/auth')

categoriasRota.get('/', authMiddleware.verificaJWT, async (request, response) => {
  
  const user = await User.findById(request.userId)
  
  const Categorias = await Categoria.find({user: user.id}).populate('user', {username:1})
  response.json( Categorias.map( categoria => categoria.toJSON()) )
})

categoriasRota.post('/', authMiddleware.verificaJWT, async (request, response) => {
  const body = request.body

  const user = await User.findById(request.userId)
  
  const categoria = new Categoria({
    name: body.name,
    user: user.id
  })

  const savedCategoria = await categoria.save()

  user.categorias = user.categorias.concat(savedCategoria._id)  
  await user.save()

  response.json(savedCategoria.toJSON())
})

categoriasRota.get('/:id', authMiddleware.verificaJWT, async (request, response) => {

  const categoria = await Categoria.findById(request.params.id)
  if (categoria) {
    response.json(categoria.toJSON())
  } else {
    response.status(404).end()
  }

})

categoriasRota.delete('/:id', authMiddleware.verificaJWT, async (request, response) => {
  
  await Categoria.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = categoriasRota