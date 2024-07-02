const { mostrarTicketsAbertos } = require("../db/tickets");

module.exports = (api) => {
  api.get("/tickets", async(req, res) => {
    try {
        const dados = await mostrarTicketsAbertos()
        res.send({dados: true, dbDados: dados, status: 200}).status(200)
    } catch (error) {

    }
  });
};
