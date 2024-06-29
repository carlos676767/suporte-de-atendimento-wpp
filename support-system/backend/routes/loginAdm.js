const jsonWebToken = require("jsonwebtoken");
const cryopteor = require("crypto");
const dbAuthAdmin = require("../db/adminLogin");
const SECRET_KEY = cryopteor.randomBytes(32).toString("hex");
require('dotenv').config({ path: '/app.env' })
const bodyParser = require('body-parser')

module.exports = (api) => {
  api.use(bodyParser.json())

  api.use((res, req, next) => {
    dbAuthAdmin().then(data => {
      const {usuario, senha} =  res.body
      if (usuario == data.usuario && senha == data.senha) {
        const jwt = jsonWebToken.sign({usuario, senha}, SECRET_KEY, {expiresIn: "1h"})
        req.send({status: 200, msg: "login feito com sucesso.", login: true, token: jwt})
        next()
      }else{
        req.send({status: 404, login: false, msg: "Dados incorretos, verifique as credenciais."}).status(404)  
      }
     })
  })

  api.post("/loginAdm", async(res, data) => {
    try {
      console.log('bem vindo');
      // verificarInput(usuario, senha, data);
    } catch (error) {
      data.send({status: 404, login: false, msg: "ocorreu um erro tente novamente."}).status(404)  
    }
  });
};

function verificarInput(usuario, senha, data) {
  if (!usuario && !senha) {
    data.send({ msg: "Os dados estao vazios", login: false, status: 401 }).status(401);
  }
}
