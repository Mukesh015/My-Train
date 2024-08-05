const fs = require('fs');


const stationData = require('D:\\tour-guide-1\\client\\data\\stationcode.json');


const dialogflowEntities = {
  entities: stationData.data.map(station => ({
    value: station.name,
    synonyms: [station.name, station.name.toLowerCase(), station.name.toUpperCase()]

  }))
};


fs.writeFileSync('D:\\tour-guide-1\\client\\data\\dialogflow_entities.json', JSON.stringify(dialogflowEntities, null, 2));

console.log('Dialogflow entities file created successfully.');
