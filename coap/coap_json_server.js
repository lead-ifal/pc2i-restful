const coap = require('coap');
const { coapPort } = require('coap/lib/parameters');

function Server () {
  server = coap.createServer().listen(5683, function() {
    console.log("Servidor escutando na porta:", coapPort)
  })

  server.on('request', function(req, res) {
    console.log("\nPATH "+req.url+" requisitado");

    var json = JSON.parse(req.payload);
    console.log("string:", json);
    res.code = '2.01'
    res.end()
  })
}

Server()