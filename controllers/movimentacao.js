const movimentacaoRouter = require('express').Router()
const Movimentacao = require('../models/movimentacao')
const User = require('../models/user')
const authMiddleware = require('../utils/auth')

movimentacaoRouter.get('/', authMiddleware.verificaJWT, async (request, response) => {
  const movimentacoes = await Movimentacao.find({}).populate('categoria')

  response.json(movimentacoes.map(movimentacao => movimentacao.toJSON()))
})

movimentacaoRouter.get('/saldo', authMiddleware.verificaJWT, async (request,response) => {
  const movimentacoes = await Movimentacao.find({}).populate('categoria')

  const saldoObjeto = {
    'saldoTotal': movimentacoes.reduce( (total, movimentacao) => total+movimentacao.valor,0),
    'movimentacoes': movimentacoes
  }

  response.json(saldoObjeto)
  
})


movimentacaoRouter.post('/', authMiddleware.verificaJWT, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.userId)

  const movimentacao = new Movimentacao({
    data: new Date(),
    categoria: body.categoria,
    tipo: body.tipo,
    valor: body.valor,
    descricao: body.descricao,
    user: user.id
  })

  const savedMovimentacao = await movimentacao.save()

  user.movimentacoes = user.movimentacoes.concat(savedMovimentacao._id)  
  await user.save()

  response.json(savedMovimentacao.toJSON())
})

movimentacaoRouter.get('/:id', authMiddleware.verificaJWT, async (request, response) => {
  const movimentacao = await Movimentacao.findById(request.params.id).populate('categoria')
  if (movimentacao) {
    response.json(movimentacao.toJSON())
  } else {
    response.status(404).end()
  }
})

movimentacaoRouter.put('/:id', authMiddleware.verificaJWT, (request, response) => {
  const body = request.body

  const Movimentacao = {
    categoria: body.categoria,
    tipo: body.tipo,
    valor: body.valor,
    descricao: body.descricao 
  }

  Movimentacao.findByIdAndUpdate(request.params.id, Movimentacao, { new: true })
    .then(updatedMovimentacao => {
      response.json(updatedMovimentacao.toJSON())
    })
})

movimentacaoRouter.delete('/:id', authMiddleware.verificaJWT, async (request, response) => {
  await Movimentacao.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = movimentacaoRouter