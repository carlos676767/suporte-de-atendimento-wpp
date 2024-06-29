const axios = require("axios")
axios.post("http://localhost:8080/loginAdm",{
    "usuario": "ORTIalUENTuRARyL",
    "senha": "%dy;G,rf<$"
})
.then(data => {
    console.log(data.data);
})