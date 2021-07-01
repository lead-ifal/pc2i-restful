/**
 * Simula com HTTP o envio de dados por um cliente PC2I (e.g., LoRa Node)
 * @author Felipe A. Lopes <felipe.alencar@ifal.edu.br>
 */
const http = require('http');

// TODO Recuperar dados do csv criado pelo Jabes.
const requestData = JSON.stringify({
  "planting_area": {
    "0": {
    "size": 0,
    "soil_characteristics": 0,
    "location": "location",
    "irrigation_zones": "zone" },

    "1": {
      "size": 0,
      "soil_characteristics": 0,
      "location": "location",
      "irrigation_zones": "zone" }
  },
  
  "cultivation": {
    "0": {
      "name": "name",
      "type": "type",
      "planting_date": "2021/04/08",
      "harvest_date": "2021/04/08",
      "culture_ratio": 0,
      "cultivation_phase": "planting",
      "soil_characteristics": 0,
      "location": "location",
      "change_date_phase": "2021/04/08" },

      "1": {
        "name": "name",
        "type": "type",
        "planting_date": "2021/04/08",
        "harvest_date": "2021/04/08",
        "culture_ratio": 0,
        "cultivation_phase": "planting",
        "soil_characteristics": 0,
        "location": "location",
        "change_date_phase": "2021/04/08" }
  },

  "irrigation_plan": {
    "0": {
      "datetime_last_irrigation": "2021/04/08 11:50:00",
      "date_next_irrigation": "2021/04/08",
      "irrigation_start_date": "2021/04/08",
      "number_irrigations": 0,
      "irrigation_duration": "30 minutes" },

    "1": {
      "datetime_last_irrigation": "2021/04/08 11:50:00",
      "date_next_irrigation": "2021/04/08",
      "irrigation_start_date": "2021/04/08",
      "number_irrigations": 0,
      "irrigation_duration": "30 minutes" }
  },

  "irrigation_zones": {
    "0": {
      "type_irrigation": "located",
      "cultivation": "soybean",
      "irrigation_plan": 0,
      "height_sea_level": 0 },

    "1": {
      "type_irrigation": "located",
      "cultivation": "soybean",
      "irrigation_plan": 0,
      "height_sea_level": 0 }
  }
});

console.log(requestData);

const options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/update-entities',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

const request = http.request(options, (res) => {
  if (res.statusCode !== 201) {
    console.log(res);
    console.error(`Não recebi um Criado do servidor. Código: ${res.statusCode}`);
    res.resume();
    return;
  }

  res.on('close', () => {
    console.log('Requisição realizada.');
  });
});

request.end(requestData);

request.on('error', (err) => {
  console.error(`Erro encontrado ao tentar realizar uma requisição: ${err.message}`);
});