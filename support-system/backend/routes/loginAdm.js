const jsonWebToken = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const dbAuthAdmin = require("../db/adminLogin");

dotenv.config({ path: '/app.env' });
const SECRET_KEY = "2544112c3e76884a12fa2336cbf59dabc38fe1f80db1e970705267dca96bfa09"

module.exports = (api) => {
  api.use(cors());
  api.use(bodyParser.json());
  checkingJWT(api);
  post(api);
};

function checkingJWT(api) {
  api.use((req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.slice(7);
      jsonWebToken.verify(token, SECRET_KEY, (err, decoded) => {
        verifyErrorJwt(err, next, res)
      });
    } else {
      console.log();
      next();
    };
  });
};

function verifyErrorJwt(err, next, res) {
  if (err) {
    next();
  }else{
    res.send({ status: 200, msg: "login feito com sucesso.", login: true })
  }
}

function post(api) {
  api.post("/loginAdm", async (req, res) => {
    try {
      const { usuario, senha } = req.body;
      const db = await dbAuthAdmin();
      if (usuario == db.usuario && senha == db.senha) {
        const jwt = jsonWebToken.sign({ usuario, senha }, SECRET_KEY, { expiresIn: "60s" })
        res.send({ status: 200, msg: "login feito com sucesso.", login: true, token: jwt })
      } else {
        res.status(404).send({ status: 404, login: false, msg: "Dados incorretos, verifique as credenciais." })
      }
    } catch (error) {
      console.log(error);
      res.send({ status: 404, login: false, msg: "ocorreu um erro tente novamente." }).status(404)
    };
  });
}
