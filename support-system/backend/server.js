const express = require("express")
const api = express()

const consign = require("consign")
consign()
.include("./routes")
.into(api);


const port = 8080 || process.env.PORT
api.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
