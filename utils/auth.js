const jwt = require('jsonwebtoken')

const verificaJWT = (request, response, next) => {
  var token = getTokenFrom(request)

  if (!token) return response.status(401).send({ auth: false, message: 'Token missing or invalid.' })
    
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
      
    // se tudo estiver ok, salva no request para uso posterior
    request.userId = decoded.id
    next()
  })
}

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)  
  }  
  return null
}

module.exports = {
  verificaJWT
}