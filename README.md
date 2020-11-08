# cv-api

end-point : https://gentle-fjord-59942.herokuapp.com/api/


**Como rodar**

 Clonar o repositorio.
 Criar o arquivo .env com as seguintes variaveis setadas.

    MONGODB_URI=mongodb+srv://
    PORT=
    TEST_MONGODB_URI=mongodb+srv://
    SECRET=
Sendo as MONGODB os enderecos para a database no Atlas: MongoDB.
Secrete a chave usada na autenticao jwt.

Com os arquivos setados:

    npm run dev
Vai subir a aplicacao local na porta definida.

**Rotas**
/api/users { POST, GET }

/api/login  { POST } 

/api/categoria { POST, GET, DELETE, PUT }

/api/movimentacao { POST, GET, DELETE, PUT }

/api/movimentacao/saldo { GET }

