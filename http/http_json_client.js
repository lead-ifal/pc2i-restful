/**
 * Simula com HTTP o envio de dados por um cliente PC2I (e.g., LoRa Node)
 * @author Felipe A. Lopes <felipe.alencar@ifal.edu.br>
 */
const csv = require('csv-parser');
const fs = require('fs');
const http = require('http');

function request(data) {
  const requestData = JSON.stringify(data);

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
}

function getCSVData(file, type) {
  let data = [];
  return new Promise((resolve, reject) => {
      fs.createReadStream(file)
          .on('error', error => {
              reject(error);
          })
          .pipe(csv({headers: false, separator: ',',}))
          .on('data', (row) => {
              let item = {
                  hora: row[0],
                  temperatura: row[1],
                  umidade: row[2],
                  uv: row[3],
                  ph: row[4],
                  umidade_solo: row[5]
              };
              data.push(item);
              request(item);
          })
          .on('end', () => {
              resolve(data);
          });
  });
}

async function getData() {
  try { 
      const data = await getCSVData("pc2i-restful/dados.csv", {});
      console.log("testGetData: parsed CSV data:", data);
      return data;
  } catch (error) {
      console.error("testGetData: An error occurred: ", error.message);
  }
}

getData();
