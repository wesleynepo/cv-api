const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('quando existir apenas um usuario', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('completa a criacao de um novo usuario', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'wesley',
      name: 'Wesley Nepomuceno',
      password: 'senhasegura',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('criacao falha ao tentar repetir usuario', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sudo',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('cria e obtem token ao autenticar usuario', async () => {
    const newUser = {
      username: 'wesley',
      name: 'Wesley Nepomuceno',
      password: 'senhasegura',
    }
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const auth = await api
      .post('/api/login')
      .send( { 
        username: newUser.username, 
        password: newUser.password } )
      .expect(200)
    
    expect(auth.body.token).not.toBe('')
  })

})


afterAll(() => {
  mongoose.connection.close()
})