const jwt = require("jsonwebtoken");
const cryopteor = require("crypto");
const dbAuthAdmin = require("../db/adminLogin");
const SECRET_KEY = cryopteor.randomBytes(32).toString("hex");
require('dotenv').config({ path: '/app.env' })
module.exports = (api) => {
  api.get("/loginAdm", async(res, data) => {
    await dbAuthAdmin()
    try {
      const { usuario, senha } = res.body;
      verificarInput(usuario, senha, data);
    } catch (error) {
      data.send({status: 404, login: false, msg: "ocorreu um erro tente novamente."}).status(404)  
    }
  });
};

function verificarInput(usuario, senha, data) {
  if (!usuario && !senha) {
    data
      .send({ msg: "Os dados estao vazios", login: false, status: 401 })
      .status(401);
  }
}
