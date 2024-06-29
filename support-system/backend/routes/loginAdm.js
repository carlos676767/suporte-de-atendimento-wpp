const jsonWebToken = require("jsonwebtoken");
const cryopteor = require("crypto");
const dbAuthAdmin = require("../db/adminLogin");
const SECRET_KEY = cryopteor.randomBytes(32).toString("hex");
require('dotenv').config({ path: '/app.env' })
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require("path")
module.exports = (api) => {
  api.use(cors())
  api.use(bodyParser.json())
  api.post("/loginAdm", async(req, res) => {
    try {
      const {usuario, senha} =  req.body
      const db = await dbAuthAdmin()
        if (usuario == db.usuario && senha == db.senha) {
          const jwt = jsonWebToken.sign({usuario, senha}, SECRET_KEY, {expiresIn: "1h"})
          res.send({status: 200, msg: "login feito com sucesso.", login: true, token: jwt})
          // res.sendFile(path.join(__dirname + '/support-system/frontend/ticket2.html'))
        }else{
          res.status(404).send({status: 404, login: false, msg: "Dados incorretos, verifique as credenciais."})
        }
    } catch (error) {
      console.log(error);
      req.send({status: 404, login: false, msg: "ocorreu um erro tente novamente."}).status(404)  
    }
  });
};

