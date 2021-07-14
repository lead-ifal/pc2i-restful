const csv = require('csv-parser');
const fs = require('fs');
const coap = require('coap')
 
function request(data) {
  const requestData = JSON.stringify(data);

  var req = coap.request({

    observe: false,
    host: 'localhost',
    pathname: '/update-entities',
    port: 5683,
    method: 'POST',
    confirmable: 'true',
    retrySend: 'true',
    options: {
        "Content-Format": 'application/json'
    }
  
  })

  req.write(requestData);
 
  //Aguardando resposta do server
  req.on('response', function(res) {
    console.log('Codigo de resposta: ', res.code);
    
    if (res.code !== '2.05') return process.exit(1);
  });
  
  req.end();
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
      const data = await getCSVData("../dados.csv", {});
      //console.log("testGetData: parsed CSV data:", data);
      return data;
  } catch (error) {
      console.error("testGetData: An error occurred: ", error.message);
  }
}
 
getData();
 