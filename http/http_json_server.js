const express = require('express');

// criando instância do express para servir aos endpoints da aplicação
const app = express();
const router = express.Router();

// codifica a url recebida como nested objects ({"animal":{"tipo":"cachorro", "raca":"vira-lada"}})
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    response.setHeader('Content-Type', 'application/json');
    next();
});

router.post('/update-entities', function(request, response, next) {
    console.log("PATH /update-entities requisitado");
    console.log(request.body);
    response.status(201).end();
});

app.use(router);
var listener = app.listen(8080, function(){
    console.log('Servidor escutando na porta: '+listener.address().port);
});